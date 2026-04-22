---
description: # Main Research Workflow (Mass Processing)
---

# Main Research Workflow (Mass Processing)

This protocol is designated for sequential, bulk processing of all research topics listed in `items.md`.  
The agent MUST process items one-by-one in a strict loop until all dossiers are completed.

## 🔄 STRICT PROCESS LOOP (MANDATORY ORDER)

For **each item**, the agent MUST follow this exact sequence:

1. **RESEARCH FIRST (MINIMUM 2 SOURCES)**
2. **THEN FILE CREATION / EDITING**
3. **THEN DASHBOARD UPDATE**
4. **THEN IMMEDIATELY MOVE TO NEXT ITEM**

Skipping or reordering steps is NOT allowed.

---

## 1. TARGET SELECTION
- Identify the next unprocessed topic in `items.md`.
- Do not skip items.
- Initialize the dossier scope clearly before starting research.

---

## 2. RESEARCH PHASE (MANDATORY BEFORE ANY EDITING)
- Collect **at least 2 reliable and verifiable sources** before writing anything.
- Preferred sources:
  - government documents
  - official institutional reports (UN, EU, WEF, SEC, etc.)
  - court records
  - academic publications
  - official company statements
  - archived official pages

### Requirements:
- Every key claim must be supported by a source.
- Extract:
  - names
  - dates
  - financial data
  - document identifiers
- Do not proceed to file editing until **minimum 2 solid sources are confirmed**.

---

## 3. DOSSIER PRODUCTION (ONLY AFTER RESEARCH IS COMPLETE)

### Page Creation / Editing
- Create or update the HTML file in `/pages/dossiers/`.
- Follow the standard Research Dashboard template.
- Keep structure clean, readable, and consistent.

### Content Structure (MANDATORY)
- **Documented Evidence**
  - strictly factual
  - source-backed
- **Narrative Context**
  - explanation or interpretation
  - must NOT present speculation as fact

### Visual & Layout Rules
- Use the existing dashboard layout system.
- Clear headings, spacing, and logical structure.
- Avoid large unstructured text blocks.
- Maintain a professional and analytical appearance.

### CSS RULE
- **NEVER use CSS inside the HTML file.**
- All styling must be handled via `style.css`.

---

## 4. SOURCE FORMAT (OFFICIAL & CONSISTENT)
Every dossier must include properly formatted sources.

Each source must contain:
- **Title**
- **Publisher / Institution**
- **Date**
- **Direct URL or archive link**

Rules:
- Prefer original official sources.
- Include archive links when relevant.
- Keep formatting identical across all dossiers.
- No incomplete or informal references.

---

## 5. DASHBOARD SYNCHRONIZATION (IMMEDIATE AFTER FILE)

- Immediately update `index.html` after creating/updating the dossier.

### Topic Card Requirements
- Use `.info-card`
- Include:
  - `h3` → title
  - `p` → description
- Ensure compatibility with search indexing.

### Additional Requirements
- Update global statistics if needed.
- Verify all internal links.
- Maintain consistent structure across the dashboard.

---

## 6. PROGRESSION (NO INTERRUPTIONS)
- After completing one dossier:
  - Immediately continue to the next item in `items.md`.
- Do not pause between items.
- Do not batch research across multiple items.

---

## 7. FINAL RULES
- Always follow: **Research → Edit → Sync → Next**
- Minimum **2 sources required per topic before writing**
- No inline CSS in HTML
- Keep structure consistent and professional
- **Do NOT initiate any git push commands**
- Workflow ends with local file completion only

---

## SOURCE EXAMPLE FORMAT

### Official Source
- **Title:** Annual Report 2024  
- **Publisher:** European Commission  
- **Date:** 14 March 2024  
- **Link:** https://...

### Archived Source
- **Title:** Policy Announcement  
- **Publisher:** Government Agency  
- **Date:** 2 May 2023  
- **Archive:** https://...  
- **Original:** https://...