/**
 * Legend search functionality for the Dossiers Inventory page.
 * Filters the list of links in real-time.
 */

const initLegendSearch = () => {
    const searchInput = document.getElementById('legend-search');
    const legendList = document.getElementById('dossier-legend');
    if (!searchInput || !legendList) {
        return;
    }

    if (searchInput.dataset.searchInitialized === 'true') {
        return;
    }

    searchInput.dataset.searchInitialized = 'true';
    const items = legendList.querySelectorAll('.legend-item');

    /**
     * Filters the legend items based on the search input value.
     */
    const filterLegend = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('input', filterLegend);
};

window.initLegendSearch = initLegendSearch;
document.addEventListener('DOMContentLoaded', initLegendSearch);
