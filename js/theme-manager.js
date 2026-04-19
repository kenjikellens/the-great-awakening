/**
 * Theme Manager: Handles light/dark mode persistence and toggling.
 * Respects system preferences and saves user override to localStorage.
 */
const ThemeManager = (function () {
    const THEME_STORAGE_KEY = 'tga-research-theme';
    const THEME_DARK = 'dark-theme';
    const root = document.documentElement;

    /**
     * Initializes the theme on load.
     * Priority: localStorage > System Preference > Default (Light)
     */
    function init() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            applyTheme(true);
        } else {
            applyTheme(false);
        }

        // Initialize toggle listeners after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggle);
        } else {
            setupToggle();
        }
    }

    /**
     * Applies the theme class and updates storage.
     * @param {boolean} isDark 
     */
    function applyTheme(isDark) {
        if (isDark) {
            root.classList.add(THEME_DARK);
            localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        } else {
            root.classList.remove(THEME_DARK);
            localStorage.setItem(THEME_STORAGE_KEY, 'light');
        }
        updateToggleIcons(isDark);
    }

    /**
     * Toggles the theme between dark and light.
     */
    function toggleTheme() {
        const isCurrentlyDark = root.classList.contains(THEME_DARK);
        applyTheme(!isCurrentlyDark);
    }

    /**
     * Finds and attaches click listener to the theme toggle button.
     */
    function setupToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        }
    }

    /**
     * Updates the UI icons inside the toggle button.
     * @param {boolean} isDark 
     */
    function updateToggleIcons(isDark) {
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');
        
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'block' : 'none';
            moonIcon.style.display = isDark ? 'none' : 'block';
        }
    }

    return {
        init,
        toggleTheme
    };
})();

// Initialize immediately to prevent flash of unstyled content
ThemeManager.init();

// Export to window
window.ThemeManager = ThemeManager;
