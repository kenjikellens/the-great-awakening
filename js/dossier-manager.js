/**
 * Dossier Manager: Handles data fetching, rendering, and advanced search.
 */
const DossierManager = (function () {
    let dossiersData = null;

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
     * Renders the simplified dossier list for the Home view.
     */
    async function renderHomeList() {
        const data = await loadData();
        const container = document.getElementById('home-dossier-list');
        if (!container) return;

        container.innerHTML = data.map(item => `
            <div class="dossier-item" data-id="${item.id}">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="#dossier/${item.id}" class="card-link">View Dossier &rarr;</a>
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

        // Group by category
        const categories = data.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        // Sort categories alphabetically
        const sortedCategories = Object.keys(categories).sort();

        container.innerHTML = sortedCategories.map(cat => `
            <div class="category-block" style="margin-bottom: 2.5rem;">
                <h3 class="section-title" style="font-size: 1.1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    ${cat}
                </h3>
                <div class="legend-list" style="display: flex; flex-direction: column; gap: 8px;">
                    ${categories[cat].sort((a, b) => a.title.localeCompare(b.title)).map(item => `
                        <a href="#dossier/${item.id}" class="legend-item" data-id="${item.id}">${item.title}</a>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    /**
     * Renders the header mega-menu from JSON data.
     */
    async function renderMegaMenu() {
        const data = await loadData();
        const container = document.getElementById('mega-menu-dynamic-content');
        if (!container) return;

        // Group by category
        const categories = data.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        // Sort categories
        const sortedCategories = Object.keys(categories).sort();

        container.innerHTML = sortedCategories.map(cat => `
            <div class="mega-menu-category">
                <h4>${cat.split('&')[0].trim()}</h4>
                <ul class="mega-menu-list">
                    ${categories[cat].sort((a, b) => a.title.localeCompare(b.title)).map(item => `
                        <li><a href="#dossier/${item.id}">${item.title}</a></li>
                    `).join('')}
                </ul>
            </div>
        `).join('') + `
            <div class="mega-menu-category">
                <h4>Discovery</h4>
                <ul class="mega-menu-list">
                    <li><a href="#dossiers" class="view-all-link">→ View All Dossiers</a></li>
                </ul>
            </div>
        `;
    }

    /**
     * Advanced search: Scans title, summary, and hidden keywords.
     * @param {string} query The search query.
     * @param {string} mode 'home' or 'legend' to determine which UI to update.
     */
    async function executeSearch(query, mode = 'home') {
        const data = await loadData();
        const searchTerm = query.toLowerCase().trim();
        
        const results = data.filter(item => {
            const inTitle = item.title.toLowerCase().includes(searchTerm);
            const inSummary = item.summary.toLowerCase().includes(searchTerm);
            const inKeywords = item.keywords.some(kw => kw.toLowerCase().includes(searchTerm));
            return inTitle || inSummary || inKeywords;
        });

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
                    <h3 style="font-family: 'Libre Baskerville', serif;">No dossiers found</h3>
                    <p style="color: #54595d;">Try searching for a different keyword.</p>
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
        renderHomeList,
        renderDossiersIndex,
        renderMegaMenu,
        executeSearch
    };
})();

// Export to window
window.DossierManager = DossierManager;

// Initialize global components
document.addEventListener('DOMContentLoaded', () => {
    DossierManager.renderMegaMenu();
});
