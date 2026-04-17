# The Great Awakening

**The Great Awakening** is a high-fidelity research archive project designed to document declassified files, globalist agendas, and institutional analysis within a premium, academic-grade web interface.

## 🏗 Functional Architecture

The website is built as a **Single Page Application (SPA)** using a custom-engineered vanilla JavaScript framework, prioritizing speed, SEO, and aesthetics without the overhead of heavy external libraries.

### 1. Hash-Based Router (`js/router.js`)
The core of the navigation system. It intercepts URL hash changes (e.g., `#home`, `#dossiers`, `#dossier/slug`) and dynamically loads content.
- **Fragment Loading**: Fetches small HTML components from `pages/fragments/` and injects them into the main `#content-shell`.
- **Dossier Injection**: Specifically handles individual dossier page loading by fetching full HTML files from `pages/dossiers/`, extracting the `<main>` content and any custom `<style>` tags to preserve unique formatting.

### 2. Dossier Management System (`js/dossier-manager.js`)
Handles the data layer and UI rendering for the research archives.
- **Centralized Data**: Uses `data/dossiers.js` as a flat-file database containing metadata for every entry.
- **Dynamic Rendering**: Generates the "Mega Menu", Home featured cards, and the Categorized Legend automatically from the JSON data.
- **Advanced Search Engine**: A real-time filtering system that scans through titles, summaries, and keywords for instant discovery.

### 3. Design Philosophy
The UI is inspired by modern archival and journalistic standards:
- **Typography**: Uses **Libre Baskerville** for authoritative headers and **Noto Sans** for highly readable body text.
- **Aesthetics**: A clean, premium grid layout with high contrast and subtle border accents, ensuring a distraction-free research experience.

---

## 📂 Directory Structure

| Directory | Purpose |
| :--- | :--- |
| `data/` | Contains `dossiers.js`, the primary metadata storage for all archived items. |
| `js/` | Core logic including the `router.js` and `dossier-manager.js`. |
| `css/` | Global styling and design system tokens. |
| `pages/fragments/` | HTML partials used for the main site sections (Home, About, etc.). |
| `pages/dossiers/` | Individual detailed research files stored as standalone HTML. |
| `LOG/` | Internal development changelog following strict protocol. |

---

## 🚀 Getting Started

1. Clone the repository.
2. Serve the directory using a local web server (e.g., Live Server or Python `http.server`) to enable `fetch()` functionality for the fragments.
3. Access the site via `index.html`.

© 2026 The Great Awakening Research Project.
