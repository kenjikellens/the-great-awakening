/**
 * Search functionality for the Great Awakening Research Platform.
 * Implements real-time filtering of dossier cards.
 */
const initDossierSearch = () => {
    const searchInput = document.getElementById('dossier-search');
    const dossierList = document.querySelector('.dossier-list');
    if (!searchInput || !dossierList) {
        return;
    }

    if (searchInput.dataset.searchInitialized === 'true') {
        return;
    }

    searchInput.dataset.searchInitialized = 'true';
    const items = dossierList.querySelectorAll('.dossier-item');

    const existingNoResults = dossierList.querySelector('#no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }

    // Create "No results" message element
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.className = 'hidden';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '3rem';
    noResults.innerHTML = `
        <h3 style="font-family: 'Libre Baskerville', serif;">No dossiers found</h3>
        <p style="color: #54595d;">Try searching for a different topic or keyword.</p>
    `;
    dossierList.appendChild(noResults);

    /**
     * Filters the items based on the search query.
     */
    const filterItems = () => {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Toggle "No results" message
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    };

    searchInput.addEventListener('input', filterItems);
};

window.initDossierSearch = initDossierSearch;
document.addEventListener('DOMContentLoaded', initDossierSearch);
