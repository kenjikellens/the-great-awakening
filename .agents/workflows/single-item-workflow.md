---
description: # Single-Item Research Workflow (Update or Create)
---

# Single-Item Research Workflow (Update or Create)

This protocol is intended for the focused development or update of a specific research dossier. Use this when adding a new one-off topic or revising an existing page.

## 🎯 TARGETED PROCESSING

### 1. SCOPE DEFINITION
- Define the specific topic to be created or updated.
- If it is an update, analyze the existing `/pages/[topic].html` file for gaps, inconsistencies, or outdated information.
- Keep the page focused on one subject only.

### 2. PRIMARY SOURCE VALIDATION
- Perform deep-dive research using official and verifiable sources only.
- Prefer primary sources such as:
  - government documents
  - court documents
  - official company statements
  - official reports
  - academic publications
  - archived originals of official pages
- Every factual claim must be backed by a source.
- Never use unsupported claims, vague references, or unnamed websites.

### 3. CONTENT CONSTRUCTION / REVISION
- **New Page**: Create the HTML file in the `/pages/dossiers/` directory using the standard Research Dashboard template.
- **Update**: Modify the existing file while keeping the structure clean and consistent.
- Maintain a clear separation between:
  - **Documented Evidence**: only verified facts with citations
  - **Narrative Context**: explanation, interpretation, or background
- The page must remain easy to scan, with clear headings, spacing, and consistent section order.

### 4. PAGE APPEARANCE REQUIREMENTS
- The page must follow the global dashboard style and structure.
- Use the standard layout components already defined in the project.
- The page should be visually clean, readable, and structured.
- Use clear section headings, consistent spacing, and logical grouping of information.
- Do not place all content in one long block.
- Keep the design professional and dashboard-like.
- **Do NOT add CSS directly inside the HTML file.**
- If styling is needed, edit `style.css` only.

### 5. SOURCE FORMAT REQUIREMENTS
- Sources must be listed in a formal, consistent, and official way.
- Each source entry should include:
  - source title
  - publisher / institution
  - publication date
  - direct URL or archive link
- Use the original official source whenever possible.
- If the source is a PDF, cite the exact document title and include the direct file link.
- If the source is archived, include both the archive link and the original source when available.
- Keep source formatting uniform across all dossiers.
- Do not write informal source names or incomplete references.

### 6. DASHBOARD INTEGRATION
- Link the page to `index.html` if it is a new dossier.
- **MANDATORY**: Add a new topic card to the `index.html` topics grid for every new subject created.
- The topic card must use the `.info-card` class.
- The card must contain:
  - an `h3` for the title
  - a `p` element for the description
- Update any dashboard stats if the total database state changes.

### 7. FINAL VERIFICATION
- Perform a link check.
- Review the page visually against the global style system.
- Verify that all sources are correctly linked and readable.
- Confirm that the page structure is consistent with the rest of the dashboard.
- Do **not** initiate any git push commands.
- This workflow ends with local file completion only.

## SOURCE EXAMPLE FORMAT

### Official source entry
- **Title:** Annual Report 2024
- **Publisher:** European Commission
- **Date:** 14 March 2024
- **Link:** https://...

### Archived source entry
- **Title:** Press Release on Policy Update
- **Publisher:** Ministry of Finance
- **Date:** 2 May 2023
- **Archive:** https://...
- **Original:** https://...