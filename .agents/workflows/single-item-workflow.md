---
description: # Single-Item Research Workflow (Update or Create)
---

# Single-Item Research Workflow (Update or Create)

This protocol is intended for the focused development or update of a specific research dossier. Use this when adding a new one-off topic or revising an existing page.

## 🎯 TARGETED PROCESSING

### 1. SCOPE DEFINITION
- Define the specific topic to be created or updated.
- If it is an update, analyze the existing `/pages/[topic].html` file for gaps or outdated info.

### 2. PRIMARY SOURCE VALIDATION
- Perform deep-dive research for official documents and data points.
- Ensure all new information is backed by a verifiable source (URL, PDF, Archive).

### 3. CONTENT CONSTRUCTION / REVISION
- **New Page**: Create the HTML file in the `/pages/dossiers/` directory using the standard Research Dashboard template.
- **Card Structure**: Use the `.info-card` class with an `h3` for the title and a `p` for the description in `index.html` to ensure the search script can index it.
- **Update**: Modify the existing file, ensuring the clear separation of "Documented Evidence" and "Narrative Context" is maintained.
- **Strict Rule**: No `translate` effects in the CSS/UI.

### 4. DASHBOARD INTEGRATION
- Link the page to `index.html` if it is a new dossier.
- **MANDATORY**: Add a new topic card to the `index.html` topics grid for every new subject created.
- Update stats in the main dashboard to reflect the current state of the database.

### 5. FINAL VERIFICATION
- Perform a link check and a visual review against the global style system.
- **Do NOT initiate any git push commands**. This workflow ends with local file completion.

