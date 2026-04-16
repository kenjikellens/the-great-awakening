/**
 * Search functionality for the Great Awakening Research Platform.
 * Uses the DossierManager for advanced keyword-based search.
 */
const initDossierSearch = () => {
    const searchInput = document.getElementById('dossier-search');
    if (!searchInput) return;

    if (searchInput.dataset.searchInitialized === 'true') return;

    searchInput.dataset.searchInitialized = 'true';

    /**
     * Re-renders the list by applying the search query.
     */
    const handleSearch = (event) => {
        const query = event.target.value;
        DossierManager.executeSearch(query, 'home');
    };

    searchInput.addEventListener('input', handleSearch);
};

const initLegendSearch = () => {
    const legendSearchInput = document.getElementById('legend-search');
    if (!legendSearchInput) return;

    if (legendSearchInput.dataset.searchInitialized === 'true') return;

    legendSearchInput.dataset.searchInitialized = 'true';

    /**
     * Re-renders the legend by applying the search query.
     */
    const handleLegendSearch = (event) => {
        const query = event.target.value;
        DossierManager.executeSearch(query, 'legend');
    };

    legendSearchInput.addEventListener('input', handleLegendSearch);
};

// Export to window
window.initDossierSearch = initDossierSearch;
window.initLegendSearch = initLegendSearch;

// Try to initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initDossierSearch();
    initLegendSearch();
});
