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

        container.innerHTML = data.map(item => `
            <div class="info-card" data-id="${item.id}">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="#dossier/${item.id}" class="btn-action card-link">View Dossier <span class="icon-inline icon-right"></span></a>
            </div>
        `).join('');
    }

    /**
     * Renders the categorized dossier index for the Dossiers view (Legend).
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

        container.innerHTML = `
            <div class="alphabet-index-container">
                ${sortedLetters.map(letter => `
                    <div class="alphabet-group category-block u-mb-2">
                        <h3 class="section-title u-font-small u-mb-1">${letter}</h3>
                        <div class="legend-list u-flex-column u-gap-8">
                            ${alphabetGroups[letter].map(item => `
                                <a href="#dossier/${item.id}" class="legend-item" data-id="${item.id}">
                                    ${item.title}
                                    <span class="u-text-muted u-font-xsmall u-ml-1">(${item.category})</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
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
            
            // Also toggle category headers if they have no visible children
            const categoryBlocks = document.querySelectorAll('.category-block');
            categoryBlocks.forEach(block => {
                const visibleItems = block.querySelectorAll('.legend-item:not(.hidden)');
                block.style.display = visibleItems.length > 0 ? 'block' : 'none';
            });
            toggleNoResults(results.length === 0, 'dossier-legend-container');
        }
    }

    function toggleNoResults(show, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let noResults = document.getElementById(`no-results-${containerId}`);
        if (show) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = `no-results-${containerId}`;
                noResults.style.textAlign = 'center';
                noResults.style.padding = '3rem';
                noResults.innerHTML = `
                    <h3 class="u-font-serif">No dossiers found</h3>
                    <p class="u-text-muted">Try searching for a different keyword.</p>
                `;
                container.appendChild(noResults);
            }
            noResults.style.display = 'block';
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    }

    return {
        loadData,
        normalizeSearchText,
        searchDossiers,
        renderHomeList,
        renderDossiersIndex,
        renderMegaMenu,
        moveMegaMenu,
        executeSearch
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
