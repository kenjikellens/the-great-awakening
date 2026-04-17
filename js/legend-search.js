/**
 * Legacy compatibility wrapper.
 * The real legend search initializer lives in js/search.js.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initLegendSearch === 'function') {
        window.initLegendSearch();
    }
});
