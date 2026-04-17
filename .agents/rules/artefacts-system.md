---
trigger: always_on
description: "Rules for saving artefacts in the correct directory."
---

# Artefacts Location Protocol

**CRITICAL RULE:**
When instructed to create an implementation plan, research report, status update, or any other type of "artefact" (or "artifact"), you MUST save the file directly into the `artefacts/` directory at the root of the workspace.

- **Target Directory:** `artefacts/`
- **File Naming:** Use descriptive names ending in `.md` (e.g., `artefacts/implementation-plan.md`).
- **Tool Usage:** Use the `write_to_file` tool to save the file. 
- **DO NOT** use the system's default hidden artifact directory. Explicitly set `IsArtifact: false` when using `write_to_file` to ensure it is placed directly into the workspace's `artefacts/` folder.

If the user asks for an artefact, it MUST appear visible in their workspace inside the `artefacts` folder so they can see it in their editor.