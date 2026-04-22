# Implementation Plan

## Agreed Workflow (Research-First, Sequential)
1. Use `docs/items.md` as the only processing order source.
2. Process each topic in strict loop:
   - Research first (minimum 2 reliable/verifiable sources).
   - Edit/create dossier page in `pages/dossiers/`.
   - Immediately sync dashboard/card layer (`.info-card` compatibility via data/routing).
   - Move directly to the next item.
3. Enforce dossier structure consistency:
   - `Documented Evidence` (factual, source-backed).
   - `Narrative Context` (interpretation, no speculation-as-fact).
   - `Official Sources` (uniform citation format).
4. Enforce CSS rule:
   - No inline CSS in dossier HTML.
   - Shared styling through `css/style.css` only.
5. Quality gate before next item:
   - 2+ sources present.
   - Uniform source fields (Title, Publisher/Institution, Date, Link).
   - No inline styles.
   - Internal linking/dashboard sync valid.

## What Has Been Implemented
- Bulk normalization pass applied across dossier pages under `pages/dossiers/`.
- Required structural sections were standardized and normalized for consistency.
- Source formatting was unified with shared source block styling.
- Dashboard-side sync compatibility was maintained through existing data/routing structure.
- `index.html` was updated with a visible mass-processing status note.
- Local processing checkpoint file created:
  - `docs/processing-checkpoints.md`
  - Tracks items in `items.md` order with validation fields.

## Current Local Status
- Branch: `main`
- Scope: local repository updates only (no automation outside repo)
- Push requested by user: **yes** (to `main`)

## Notes
- This file is a concise handoff document combining:
  - the approved execution protocol,
  - and the concrete work already performed in this repository.
