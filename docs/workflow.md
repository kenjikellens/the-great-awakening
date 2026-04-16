# AI Research & Implementation Protocol (ARIP)

This document serves as the official, mandatory framework for expanding the Great Awakening Research Project. Any AI agent tasked with contributing to this repository MUST strictly adhere to the following sequence of operations.

## PHASE 1: ATOMIC TOPIC INITIALIZATION
1. **Scope Limitation**: Select exactly ONE (1) topic from the `items.md` index or the provided research map.
2. **Exclusion Principle**: No secondary topics may be processed until the current topic is pushed to production (Main branch).

## PHASE 2: PRIMARY SOURCE INVESTIGATION
1. **Fact Authorization**: All data points must be derived from verifiable primary sources. Authorized sources include:
    - Official intergovernmental publications (UN, WEF, WHO).
    - Government archives and legislative records.
    - Financial regulatory filings (SEC, EDGAR).
    - Declassified intelligence dossiers (CIA FOIA).
2. **Source Documentation**: Every claim in the "Documented Evidence" section MUST be accompanied by a direct URL or archival reference.

## PHASE 3: NARRATIVE SYNTHESIS
1. **Context Mapping**: Identify and describe the specific role this topic plays within the "Great Awakening" or "The Matrix" narrative.
2. **Strict Neutrality**: Maintain a neutral tone. Use attributional phrases such as "The narrative suggests..." or "Allegations within this community include...".
3. **Boundary Enforcement**: Do NOT merge documented facts with speculative narratives. Maintain a clear visual and structural separation.

## PHASE 4: IMPLEMENTATION & DEPLOYMENT
1. **Asset Creation**: Generate a dedicated HTML page in the `/pages/` directory named `[topic-name].html`.
2. **Visual Consistency**:
    - Implement the established Research Dashboard theme.
    - Utilize existing CSS classes from `css/style.css` (e.g., `card-tag`, `dashboard-theme`).
    - **CRITICAL**: Do NOT use `translate` properties in any UI or CSS effects.
3. **Main Index Integration**:
    - Update the central statistics grid in `index.html`.
    - Append a new dossier card to the dashboard, linking to the newly created page.

## PHASE 5: PERSISTENCE & COMPLETION
1. **Version Control**: Execute a Git commit and push for the completed topic.
2. **Transition**: Only upon a successful push may the agent proceed to the next topic in the queue.

---
**AUTHORIZATION CODE**: ARIP-EXEC-2026
**STATUS**: MANDATORY ENFORCEMENT
