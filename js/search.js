/**
 * Search interactions for the Great Awakening Research Platform.
 * Home uses live suggestions; results uses the same search engine in a dedicated view.
 */
const SEARCH_SUGGESTION_LIMIT = 5;

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

        // Dynamic height calculation
        if (suggestionContainer) {
            const rect = searchInput.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom - 16;
            suggestionContainer.style.maxHeight = `${Math.max(100, spaceBelow)}px`;
        }

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
            const currentQuery = searchInput.value;
            const suggestionMatches = await DossierManager.searchDossiers(currentQuery, { limit: SEARCH_SUGGESTION_LIMIT });

            // Dynamic height calculation
            const rect = searchInput.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom - 16;
            suggestionContainer.style.maxHeight = `${Math.max(100, spaceBelow)}px`;

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

/**
 * Cinematic Hero ↔ Dashboard transition system.
 * Replaces the old scroll-based navigation with a state-machine layer switch.
 * 
 * States:
 *   'hero'      — hero layer visible, dashboard hidden
 *   'dashboard' — dashboard layer visible, hero hidden
 * 
 * Triggers:
 *   hero → dashboard:  click "Explore Research" | wheel-down while in hero
 *   dashboard → hero:  click "Back to overview" | wheel-up at scrollTop===0
 */
const initHeroTransition = () => {
    const heroLayer = document.getElementById('hero-layer');
    const dashboardLayer = document.getElementById('dashboard-layer');
    const viewport = document.getElementById('home-viewport');
    const clickTrigger = document.getElementById('home-scroll-trigger');
    const backTrigger = document.getElementById('dashboard-back-trigger');

    if (!heroLayer || !dashboardLayer || !viewport) return;

    // Prevent double init on SPA re-navigation
    if (viewport.dataset.transitionInit === 'true') return;
    viewport.dataset.transitionInit = 'true';

    let currentState = 'hero';
    let isTransitioning = false;

    // --- Timing constants ---
    const HERO_EXIT_MS = 650;
    const DASH_ENTER_DELAY_MS = 200;
    const DASH_ENTER_MS = 550;
    const DASH_EXIT_MS = 400;
    const HERO_ENTER_MS = 500;
    const CARD_STAGGER_MS = 35;
    const WHEEL_COOLDOWN_MS = 800;

    /**
     * Applies the staggered card-reveal animation to each .info-card
     */
    const revealCards = () => {
        const cards = dashboardLayer.querySelectorAll('.info-card');
        cards.forEach((card, i) => {
            card.classList.remove('card-reveal');
            // Force reflow to restart animation
            void card.offsetWidth;
            setTimeout(() => {
                card.classList.add('card-reveal');
            }, i * CARD_STAGGER_MS);
        });
    };

    /**
     * Removes all reveal classes from cards (for re-entry)
     */
    const resetCards = () => {
        const cards = dashboardLayer.querySelectorAll('.info-card');
        cards.forEach(card => card.classList.remove('card-reveal'));
    };

    /**
     * Cleans all transition classes from both layers
     */
    const cleanClasses = () => {
        heroLayer.classList.remove('is-exiting', 'is-entering', 'is-hidden');
        dashboardLayer.classList.remove('is-entering', 'is-visible', 'is-exiting');
    };

    // ------ TRANSITION: hero → dashboard ------
    const transitionToDashboard = () => {
        if (isTransitioning || currentState === 'dashboard') return;
        isTransitioning = true;

        // Turn header text to black
        const siteHeader = document.querySelector('.site-header');
        if (siteHeader) siteHeader.classList.remove('header-hero-mode');

        // 1. Hero exits (zoom out + blur + fade)
        heroLayer.classList.add('is-exiting');

        // 2. After a short delay, dashboard enters
        setTimeout(() => {
            dashboardLayer.classList.add('is-entering');
            // Scroll the dashboard to top in case it was scrolled before
            dashboardLayer.scrollTop = 0;
            revealCards();
        }, DASH_ENTER_DELAY_MS);

        // 3. After hero animation, hide it completely
        setTimeout(() => {
            heroLayer.classList.add('is-hidden');
            heroLayer.classList.remove('is-exiting');
        }, HERO_EXIT_MS);

        // 4. After dashboard animation, lock it as visible
        setTimeout(() => {
            dashboardLayer.classList.remove('is-entering');
            dashboardLayer.classList.add('is-visible');
            currentState = 'dashboard';
            isTransitioning = false;
        }, DASH_ENTER_DELAY_MS + DASH_ENTER_MS);
    };

    // ------ TRANSITION: dashboard → hero ------
    const transitionToHero = () => {
        if (isTransitioning || currentState === 'hero') return;
        isTransitioning = true;

        // Turn header text to white
        const siteHeader = document.querySelector('.site-header');
        if (siteHeader) siteHeader.classList.add('header-hero-mode');

        // 1. Dashboard exits (scale down + blur + fade)
        dashboardLayer.classList.remove('is-visible');
        dashboardLayer.classList.add('is-exiting');

        // 2. After a short delay, hero enters (reverse zoom)
        setTimeout(() => {
            heroLayer.classList.remove('is-hidden');
            heroLayer.classList.add('is-entering');
        }, 150);

        // 3. After dashboard exit, hide it
        setTimeout(() => {
            dashboardLayer.classList.remove('is-exiting');
            resetCards();
        }, DASH_EXIT_MS);

        // 4. After hero re-entry animation, clean up
        setTimeout(() => {
            heroLayer.classList.remove('is-entering');
            cleanClasses();
            currentState = 'hero';
            isTransitioning = false;
        }, 150 + HERO_ENTER_MS);
    };

    // --- Click Triggers ---
    if (clickTrigger) {
        clickTrigger.addEventListener('click', transitionToDashboard);
    }
    if (backTrigger) {
        backTrigger.addEventListener('click', transitionToHero);
    }

    // --- Wheel Trigger ---
    let lastWheelTime = 0;

    viewport.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelTime < WHEEL_COOLDOWN_MS) return;

        if (currentState === 'hero' && e.deltaY > 0) {
            // Scrolling down in hero → go to dashboard
            lastWheelTime = now;
            transitionToDashboard();
        } else if (currentState === 'dashboard' && e.deltaY < 0) {
            // Scrolling up in dashboard — only trigger if at the very top
            if (dashboardLayer.scrollTop <= 0) {
                lastWheelTime = now;
                transitionToHero();
            }
        }
    }, { passive: true });

    // --- Keyboard accessibility (Enter/Space on trigger) ---
    if (clickTrigger) {
        clickTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                transitionToDashboard();
            }
        });
    }
};

// Export to window
window.initDossierSearch = initDossierSearch;
window.initResultsSearch = initResultsSearch;
window.initLegendSearch = initLegendSearch;
window.initHeroTransition = initHeroTransition;

// Try to initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initDossierSearch();
    initLegendSearch();
});
