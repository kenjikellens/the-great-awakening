/**
 * Dossier Manager: Handles data fetching, rendering, and advanced search.
 */
const DossierManager = (function () {
    let dossiersData = null;
    let currentCategoryPage = 0;

    /**
     * Detects how many columns to show based on responsive breakpoints.
     */
    function getColumnsPerPage() {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 768) return 3;
        return 2;
    }

    /**
     * Shifts the carousel page and re-renders.
     */
    function moveMegaMenu(direction) {
        currentCategoryPage += direction;
        renderMegaMenu();
    }

    /**
     * Gets the dossier data from the global store.
     */
    async function loadData() {
        if (dossiersData) return dossiersData;
        
        // Use global variable from dossiers.js
        if (typeof DOSSIER_DATA !== 'undefined') {
            dossiersData = DOSSIER_DATA;
            console.log('Dossier data loaded successfully:', dossiersData.length, 'items found.');
        } else {
            console.error('DOSSIER_DATA global variable not found. Check if data/dossiers.js is loaded correctly.');
            dossiersData = [];
        }
        return dossiersData;
    }

    /**
     * Normalizes a search query so matching stays consistent across views.
     */
    function normalizeSearchText(value) {
        return String(value || '')
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ');
    }

    /**
     * Gives each dossier a simple relevance score for the current query.
     */
    function scoreSearchMatch(item, query) {
        const title = normalizeSearchText(item.title);
        const summary = normalizeSearchText(item.summary);
        const keywords = Array.isArray(item.keywords)
            ? item.keywords.map(normalizeSearchText).filter(Boolean)
            : [];

        let score = 0;

        if (title === query) score += 100;
        else if (title.startsWith(query)) score += 80;
        else if (title.includes(query)) score += 60;

        if (summary.includes(query)) score += 25;

        keywords.forEach((keyword) => {
            if (keyword === query) score += 50;
            else if (keyword.startsWith(query)) score += 40;
            else if (keyword.includes(query)) score += 20;
        });

        return score;
    }

    /**
     * Shared search helper used by suggestions and results rendering.
     */
    async function searchDossiers(query, options = {}) {
        const data = await loadData();
        const normalizedQuery = normalizeSearchText(query);
        const includeEmpty = options.includeEmpty === true;
        const limit = typeof options.limit === 'number' ? options.limit : null;

        if (!normalizedQuery) {
            const emptyResult = includeEmpty ? [...data] : [];
            return limit ? emptyResult.slice(0, limit) : emptyResult;
        }

        const rankedResults = data
            .map((item, index) => ({
                item,
                score: scoreSearchMatch(item, normalizedQuery),
                index
            }))
            .filter((entry) => entry.score > 0)
            .sort((a, b) => (
                b.score - a.score
                || a.item.title.localeCompare(b.item.title)
                || a.index - b.index
            ))
            .map((entry) => entry.item);

        return limit ? rankedResults.slice(0, limit) : rankedResults;
    }

    /**
     * Renders the simplified dossier list for the Home view.
     */
    async function renderHomeList() {
        const data = await loadData();
        const container = document.getElementById('home-dossier-list');
        if (!container) return;

        // Update container to use grid layout
        container.className = 'card-grid';

        const previewItems = data.slice(0, 12);

        container.innerHTML = previewItems.map(item => `
            <div class="info-card" data-id="${item.id}">
                <span class="archive-card-category">${item.category || 'Archive Record'}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="#dossier/${item.id}" class="btn-action card-link">View Dossier <span class="icon-inline icon-right"></span></a>
            </div>
        `).join('');
    }

    /**
     * Renders the categorized dossier index for the Dossiers view (Legend).
     * Also populates the alphabet bar and category dropdown with available options.
     */
    async function renderDossiersIndex() {
        const data = await loadData();
        const container = document.getElementById('dossier-legend-container');
        if (!container) return;

        // Sort all dossiers alphabetically
        const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));

        // Group by starting letter
        const alphabetGroups = sortedData.reduce((acc, item) => {
            const letter = item.title.charAt(0).toUpperCase();
            if (!acc[letter]) acc[letter] = [];
            acc[letter].push(item);
            return acc;
        }, {});

        const sortedLetters = Object.keys(alphabetGroups).sort();

        // Populate the alphabet bar with available letters
        populateAlphabetBar(sortedLetters);

        // Populate the category dropdown with unique categories
        populateCategoryFilter(sortedData);

        container.innerHTML = `
            <table class="legend-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedData.map(item => `
                        <tr class="legend-item" data-id="${item.id}" data-category="${item.category}">
                            <td><a href="#dossier/${item.id}" class="legend-link">${item.title}</a></td>
                            <td><span class="legend-category">${item.category || 'Uncategorized'}</span></td>
                            <td class="legend-desc">${item.summary}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Attach filter event listeners
        attachFilterListeners();
    }

    /**
     * Populates the alphabet bar with A-Z buttons, marking letters with data as active.
     */
    function populateAlphabetBar(availableLetters) {
        const bar = document.getElementById('alphabet-bar');
        if (!bar) return;

        const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        bar.innerHTML = `<button class="alphabet-btn active" data-letter="ALL">ALL</button>` +
            allLetters.map(letter => {
                const hasData = availableLetters.includes(letter);
                return `<button class="alphabet-btn${hasData ? '' : ' disabled'}" data-letter="${letter}">${letter}</button>`;
            }).join('');
    }

    /**
     * Populates the category dropdown with unique categories from the data.
     */
    function populateCategoryFilter(data) {
        const select = document.getElementById('category-filter');
        if (!select) return;

        const categories = [...new Set(data.map(item => item.category))].sort();
        select.innerHTML = `<option value="ALL">All Categories</option>` +
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    /**
     * Attaches click/change/input listeners to the alphabet bar, category filter, and search input.
     */
    function attachFilterListeners() {
        const bar = document.getElementById('alphabet-bar');
        const categorySelect = document.getElementById('category-filter');
        const searchInput = document.getElementById('legend-search');

        if (bar) {
            bar.addEventListener('click', (e) => {
                const btn = e.target.closest('.alphabet-btn');
                if (!btn || btn.classList.contains('disabled')) return;

                // Toggle active state
                bar.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyDossierFilters();
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', () => applyDossierFilters());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => applyDossierFilters());
        }
    }

    /**
     * Applies combined filtering (letter + category + text search) to the dossier legend items.
     */
    function applyDossierFilters() {
        const activeLetterBtn = document.querySelector('.alphabet-btn.active');
        const activeLetter = activeLetterBtn ? activeLetterBtn.dataset.letter : 'ALL';
        const categorySelect = document.getElementById('category-filter');
        const activeCategory = categorySelect ? categorySelect.value : 'ALL';
        const searchInput = document.getElementById('legend-search');
        const searchQuery = normalizeSearchText(searchInput ? searchInput.value : '');

        const items = document.querySelectorAll('.legend-item');
        let visibleCount = 0;

        items.forEach(item => {
            const id = item.dataset.id;
            const category = item.dataset.category || '';
            const title = item.textContent.trim();
            const firstLetter = title.charAt(0).toUpperCase();

            let show = true;

            // Letter filter
            if (activeLetter !== 'ALL' && firstLetter !== activeLetter) {
                show = false;
            }

            // Category filter
            if (activeCategory !== 'ALL' && category !== activeCategory) {
                show = false;
            }

            // Text search filter
            if (searchQuery && !normalizeSearchText(title).includes(searchQuery)) {
                show = false;
            }

            item.classList.toggle('hidden', !show);
            if (show) visibleCount++;
        });

        toggleNoResults(visibleCount === 0, 'dossier-legend-container');
    }

    /**
     * Renders the header mega-menu from JSON data.
     */
    async function renderMegaMenu() {
        const data = await loadData();
        const container = document.getElementById('mega-menu-dynamic-content');
        if (!container) return;

        // Flatten and sort A-Z alphabetically
        const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
        
        const columns = getColumnsPerPage();
        const itemsPerPage = columns * 6; // User constraint: max 6 items per column
        const totalPages = Math.ceil(sortedData.length / itemsPerPage);

        // Clamp index
        if (currentCategoryPage >= totalPages) currentCategoryPage = Math.max(0, totalPages - 1);
        if (currentCategoryPage < 0) currentCategoryPage = 0;

        const startIdx = currentCategoryPage * itemsPerPage;
        const pageItems = sortedData.slice(startIdx, startIdx + itemsPerPage);

        const itemsHtml = pageItems.map(item => `
            <div class="mega-menu-item-link">
                <a href="#dossier/${item.id}">${item.title}</a>
            </div>
        `).join('');

        const leftArrow = totalPages > 1 ? `
            <button class="mega-menu-nav prev ${currentCategoryPage === 0 ? 'disabled' : ''}" 
                    onclick="event.stopPropagation(); DossierManager.moveMegaMenu(-1)" 
                    ${currentCategoryPage === 0 ? 'disabled' : ''}>
                <span class="icon-left"></span>
            </button>` : '';

        const rightArrow = totalPages > 1 ? `
            <button class="mega-menu-nav next ${currentCategoryPage === totalPages - 1 ? 'disabled' : ''}" 
                    onclick="event.stopPropagation(); DossierManager.moveMegaMenu(1)" 
                    ${currentCategoryPage === totalPages - 1 ? 'disabled' : ''}>
                <span class="icon-right"></span>
            </button>` : '';

        container.innerHTML = `
            ${leftArrow}
            <div class="mega-menu-grid columns-${columns}">
                ${itemsHtml}
            </div>
            ${rightArrow}
            <button onclick="location.hash='#dossiers'" class="btn-action mega-menu-more">See All <span class="icon"></span></button>
        `;
    }

    /**
     * Advanced search: Scans title, summary, and hidden keywords.
     * @param {string} query The search query.
     * @param {string} mode 'home' or 'legend' to determine which UI to update.
     */
    async function executeSearch(query, mode = 'home') {
        const results = await searchDossiers(query, { includeEmpty: true });

        const resultIds = results.map(r => r.id);
        
        if (mode === 'home') {
            const items = document.querySelectorAll('.dossier-item');
            items.forEach(el => {
                const id = el.dataset.id;
                el.classList.toggle('hidden', !resultIds.includes(id));
            });
            toggleNoResults(results.length === 0, 'home-dossier-list');
        } else {
            const items = document.querySelectorAll('.legend-item');
            items.forEach(el => {
                const id = el.dataset.id;
                el.classList.toggle('hidden', !resultIds.includes(id));
            });
            toggleNoResults(results.length === 0, 'dossier-legend-container');
        }
    }

    /**
     * Renders a comprehensive Site Index (Sitemap).
     * Lists static pages and all dossiers grouped by category.
     */
    async function renderSitemap() {
        const data = await loadData();
        const container = document.getElementById('sitemap-container');
        if (!container) return;

        // Group dossiers by category
        const groups = data.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        const sortedCategories = Object.keys(groups).sort();

        // Main Sections
        const staticSections = `
            <section class="sitemap-section">
                <h2 class="sitemap-category-title">Core Sections</h2>
                <ul class="sitemap-list">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#dossiers">Research Database (Index)</a></li>
                    <li><a href="#about">About the Project</a></li>
                    <li><a href="#contact">Contact & Research Submission</a></li>
                    <li><a href="#sitemap">Site Index (Sitemap)</a></li>
                </ul>
            </section>
        `;

        // Dossier Sections
        const dossierSections = sortedCategories.map(cat => {
            const items = groups[cat].sort((a, b) => a.title.localeCompare(b.title));
            return `
                <section class="sitemap-section">
                    <h2 class="sitemap-category-title">${cat}</h2>
                    <ul class="sitemap-list">
                        ${items.map(item => `
                            <li><a href="#dossier/${item.id}">${item.title}</a></li>
                        `).join('')}
                    </ul>
                </section>
            `;
        }).join('');

        container.innerHTML = staticSections + dossierSections;
    }

    return {
        loadData,
        normalizeSearchText,
        searchDossiers,
        renderHomeList,
        renderDossiersIndex,
        renderMegaMenu,
        moveMegaMenu,
        executeSearch,
        renderSitemap
    };
})();

// Export to window
window.DossierManager = DossierManager;

// Initialize global components
document.addEventListener('DOMContentLoaded', () => {
    DossierManager.renderMegaMenu();
});

// Responsive re-rendering for mega-menu carousel
window.addEventListener('resize', () => {
    if (document.getElementById('mega-menu-dynamic-content')) {
        DossierManager.renderMegaMenu();
    }
});
