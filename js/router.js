/**
 * Hash-based router for SPA fragment loading.
 * Supports static views and dossier detail views.
 */
(function () {
    const shell = document.getElementById('content-shell');
    const routeLinks = document.querySelectorAll('[data-route]');
    const baseTitle = 'The Great Awakening';
    let activeDossierStyleTag = null;

    const staticRoutes = {
        home: {
            fragment: 'pages/fragments/home.html',
            title: `${baseTitle} | Home`,
            init: async () => {
                await DossierManager.renderHomeList();
                if (typeof window.initDossierSearch === 'function') {
                    window.initDossierSearch();
                }
            }
        },
        results: {
            fragment: 'pages/fragments/results.html',
            title: `${baseTitle} | Results`,
            init: async (query = '') => {
                document.title = query
                    ? `${baseTitle} | Results | ${query}`
                    : `${baseTitle} | Results`;
                if (typeof window.initResultsSearch === 'function') {
                    await window.initResultsSearch(query);
                }
            }
        },
        dossiers: {
            fragment: 'pages/fragments/dossiers.html',
            title: `${baseTitle} | Dossiers`,
            init: async () => {
                await DossierManager.renderDossiersIndex();
                if (typeof window.initLegendSearch === 'function') {
                    window.initLegendSearch();
                }
            }
        },
        about: {
            fragment: 'pages/fragments/about.html',
            title: `${baseTitle} | About`
        },
        contact: {
            fragment: 'pages/fragments/contact.html',
            title: `${baseTitle} | Contact`
        }
    };

    const extractHash = () => window.location.hash.replace(/^#/, '').trim();

    const setActiveNav = (viewName) => {
        routeLinks.forEach((link) => {
            const isActive = link.dataset.route === viewName;
            link.classList.toggle('active', isActive);
        });
    };

    const clearDossierStyle = () => {
        if (activeDossierStyleTag) {
            activeDossierStyleTag.remove();
            activeDossierStyleTag = null;
        }
    };

    const fetchText = async (path) => {
        const response = await fetch(path, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to load "${path}" (${response.status})`);
        }
        return response.text();
    };

    const renderStaticRoute = async (viewName, param = '') => {
        const route = staticRoutes[viewName] || staticRoutes.home;
        clearDossierStyle();
        shell.innerHTML = await fetchText(route.fragment);
        document.title = route.title;
        setActiveNav(viewName);
        if (typeof route.init === 'function') {
            await route.init(param);
        }
    };

    const renderDossierRoute = async (slug) => {
        clearDossierStyle();
        shell.innerHTML = await fetchText('pages/fragments/dossier-view.html');
        setActiveNav('dossiers');

        const host = document.getElementById('dossier-fragment-host');
        if (!host) {
            throw new Error('Dossier host container missing.');
        }

        host.innerHTML = '<p>Loading dossier...</p>';

        const dossierHtml = await fetchText(`pages/dossiers/${slug}.html`);
        const parsed = new DOMParser().parseFromString(dossierHtml, 'text/html');
        const main = parsed.querySelector('main');
        const title = parsed.querySelector('title');
        const inlineStyle = parsed.querySelector('head style');

        if (!main) {
            throw new Error(`No <main> content found in dossier "${slug}".`);
        }

        if (inlineStyle && inlineStyle.textContent.trim()) {
            activeDossierStyleTag = document.createElement('style');
            activeDossierStyleTag.setAttribute('data-dossier-style', slug);
            activeDossierStyleTag.textContent = inlineStyle.textContent;
            document.head.appendChild(activeDossierStyleTag);
        }

        host.innerHTML = main.innerHTML;
        document.title = title ? title.textContent : `${baseTitle} | Dossier`;
    };

    const renderNotFound = () => {
        clearDossierStyle();
        shell.innerHTML = `
            <main class="dashboard-section u-mt-3">
                <section class="content-card">
                    <h1 class="u-font-serif u-mb-1">View Not Found</h1>
                    <p>The requested section does not exist. Return to <a href="#home">Home</a>.</p>
                </section>
            </main>
        `;
        document.title = `${baseTitle} | Not Found`;
        setActiveNav('');
    };

    const renderError = (message) => {
        shell.innerHTML = `
            <main class="dashboard-section u-mt-3">
                <section class="content-card">
                    <h1 class="u-font-serif u-mb-1">Load Error</h1>
                    <p>${message}</p>
                    <p class="u-mt-1">Try returning to <a href="#home">Home</a>.</p>
                </section>
            </main>
        `;
    };

    const route = async () => {
        const hash = extractHash();
        const [segment, slug] = hash.split('/');

        try {
            if (!hash) {
                window.location.hash = '#home';
                return;
            }

            if (segment === 'dossier') {
                if (!slug) {
                    renderNotFound();
                    return;
                }
                await renderDossierRoute(slug);
                return;
            }

            if (Object.prototype.hasOwnProperty.call(staticRoutes, segment)) {
                await renderStaticRoute(segment, slug ? decodeURIComponent(slug) : '');
                return;
            }

            renderNotFound();
        } catch (error) {
            renderError(error.message);
        }
    };

    window.addEventListener('hashchange', route);
    window.addEventListener('DOMContentLoaded', route);
})();
