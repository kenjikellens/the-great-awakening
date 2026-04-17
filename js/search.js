/**
 * Search interactions for the Great Awakening Research Platform.
 * Home uses live suggestions; results uses the same search engine in a dedicated view.
 */
const SEARCH_SUGGESTION_LIMIT = 6;

const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getSearchQuery = (value) => {
    if (typeof DossierManager !== 'undefined' && typeof DossierManager.normalizeSearchText === 'function') {
        return DossierManager.normalizeSearchText(value);
    }

    return String(value || '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');
};

const getSearchRoute = (query) => `#results/${encodeURIComponent(String(query || '').trim())}`;

const renderSuggestionItems = (container, items, query) => {
    if (!container) return;

    if (!query.trim()) {
        container.innerHTML = '';
        container.hidden = true;
        return;
    }

    if (!items.length) {
        container.innerHTML = `
            <div class="search-suggestions-empty" role="status">
                No suggestions found.
            </div>
        `;
        container.hidden = false;
        return;
    }

    container.innerHTML = items.map((item) => `
        <button
            type="button"
            class="search-suggestion"
            data-suggestion="${escapeHtml(item.title)}"
            aria-label="Search for ${escapeHtml(item.title)}"
        >
            <span class="search-suggestion-title">${escapeHtml(item.title)}</span>
        </button>
    `).join('');
    container.hidden = false;
};

const renderResultsList = (container, items, query) => {
    if (!container) return;

    const normalizedQuery = String(query || '').trim();

    if (!normalizedQuery) {
        container.innerHTML = `
            <div class="results-empty content-card">
                <h2 class="u-font-serif u-mb-1">Search the archive</h2>
                <p class="u-text-muted">Type a term above and press Enter to open the results page.</p>
            </div>
        `;
        return;
    }

    if (!items.length) {
        container.innerHTML = `
            <div class="results-empty content-card">
                <h2 class="u-font-serif u-mb-1">No results found</h2>
                <p class="u-text-muted">Try a broader search term, a dossier title, or a summary phrase.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map((item) => `
        <article class="search-result-card">
            <div class="search-result-card__body">
                <h2 class="search-result-title">${escapeHtml(item.title)}</h2>
                <p class="search-result-summary">${escapeHtml(item.summary)}</p>
            </div>
            <div class="search-result-card__actions">
                <a href="#dossier/${escapeHtml(item.id)}" class="btn-action card-link">View Dossier <span class="icon-inline icon-right"></span></a>
            </div>
        </article>
    `).join('');
};

const navigateToResults = (query) => {
    const trimmedQuery = String(query || '').trim();
    if (!trimmedQuery) return;
    window.location.hash = getSearchRoute(trimmedQuery);
};

const initDossierSearch = () => {
    const searchInput = document.getElementById('dossier-search');
    const suggestionContainer = document.getElementById('home-search-suggestions');
    if (!searchInput) return;

    if (searchInput.dataset.searchInitialized === 'true') return;
    searchInput.dataset.searchInitialized = 'true';

    const updateSuggestions = async () => {
        const query = searchInput.value;
        const matches = await DossierManager.searchDossiers(query, { limit: SEARCH_SUGGESTION_LIMIT });
        renderSuggestionItems(suggestionContainer, matches, query);
        searchInput.setAttribute('aria-expanded', matches.length > 0 ? 'true' : 'false');
    };

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigateToResults(searchInput.value);
        }
    };

    searchInput.addEventListener('input', updateSuggestions);
    searchInput.addEventListener('keydown', handleSubmit);

    if (suggestionContainer) {
        suggestionContainer.addEventListener('click', (event) => {
            const button = event.target.closest('[data-suggestion]');
            if (!button) return;
            navigateToResults(button.dataset.suggestion || searchInput.value);
        });
    }

    updateSuggestions();
};

const initResultsSearch = async (query = '') => {
    const searchInput = document.getElementById('results-search');
    const resultsContainer = document.getElementById('results-list');
    const resultsCount = document.getElementById('results-count');
    const resultsQuery = document.getElementById('results-query');
    const suggestionContainer = document.getElementById('results-search-suggestions');

    if (!searchInput || !resultsContainer) return;

    if (searchInput.dataset.searchInitialized === 'true') return;
    searchInput.dataset.searchInitialized = 'true';

    const renderCurrentResults = async () => {
        const currentQuery = searchInput.value;
        const matches = await DossierManager.searchDossiers(currentQuery);
        renderResultsList(resultsContainer, matches, currentQuery);

        if (resultsCount) {
            resultsCount.textContent = currentQuery.trim()
                ? `${matches.length} result${matches.length === 1 ? '' : 's'}`
                : '0 results';
        }

        if (resultsQuery) {
            resultsQuery.textContent = currentQuery.trim() || 'Search';
        }

        if (suggestionContainer) {
            const suggestionMatches = await DossierManager.searchDossiers(currentQuery, { limit: SEARCH_SUGGESTION_LIMIT });
            renderSuggestionItems(suggestionContainer, suggestionMatches, currentQuery);
        }
    };

    searchInput.value = query;

    searchInput.addEventListener('input', renderCurrentResults);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigateToResults(searchInput.value);
        }
    });

    if (suggestionContainer) {
        suggestionContainer.addEventListener('click', (event) => {
            const button = event.target.closest('[data-suggestion]');
            if (!button) return;
            navigateToResults(button.dataset.suggestion || searchInput.value);
        });
    }

    await renderCurrentResults();
};

const initLegendSearch = () => {
    const legendSearchInput = document.getElementById('legend-search');
    if (!legendSearchInput) return;

    if (legendSearchInput.dataset.searchInitialized === 'true') return;
    legendSearchInput.dataset.searchInitialized = 'true';

    const handleLegendSearch = (event) => {
        const query = event.target.value;
        DossierManager.executeSearch(query, 'legend');
    };

    legendSearchInput.addEventListener('input', handleLegendSearch);
};

// Export to window
window.initDossierSearch = initDossierSearch;
window.initResultsSearch = initResultsSearch;
window.initLegendSearch = initLegendSearch;

// Try to initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initDossierSearch();
    initLegendSearch();
});
