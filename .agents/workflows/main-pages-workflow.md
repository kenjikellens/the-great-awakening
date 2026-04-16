---
description: # Main Research Workflow (Mass Processing)
---

# Main Research Workflow (Mass Processing)

This protocol is designated for sequential, bulk processing of all research topics identified in the `items.md` index. The agent is required to iterate through the entire index until all dossiers are completed.

## 🔄 BATCH ITERATION CYCLE
The agent MUST follow this loop for every item in the index:

### 1. TARGET SELECTION
- Identify the next unpopulated topic in `items.md`.
- Initialize the dossier for that specific topic.

### 2. RIGOROUS RESEARCH & DATA MINING
- **Primary Source Search**: Investigate official records (UN, WEF, SEC, Government Archives).
- **Evidence Extraction**: Collect dates, names, financial figures, and document IDs.
- **Narrative Context**: Document how the topic fits into the "Great Awakening" worldview without validating the theory as a fact.

### 3. DOSSIER PRODUCTION
- **Page Generation**: Create the HTML file in `/pages/dossiers/`.
- **Card Indexing**: The new card in `index.html` MUST use the `.info-card` structure (`h3` for title, `p` for description) to enable real-time search functionality.
- **Content Standards**: Strictly separate documented evidence from narrative context.
- **Visual Design**: Use the Research Dashboard theme. NO `translate` properties in CSS.

### 4. DASHBOARD SYNCHRONIZATION
- **IMMEDIATE ACTION**: Add a new topic card for this item to the `index.html` topics grid immediately upon creation.
- Update the global statistics in `index.html`.
- Ensure all internal links are functional.

### 5. PROGRESSION
- Move to the next item in the index immediately after local file completion.
- **Do NOT initiate any git push commands**. This workflow is for local file generation only.
