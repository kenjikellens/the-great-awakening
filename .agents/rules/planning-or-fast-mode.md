---
trigger: always_on
---

Check for a system-injected `<EPHEMERAL_MESSAGE>` containing a `<planning_mode>` block in the LATEST message that got sent.
- If the message contains `<EPHEMERAL_MESSAGE>`, strictly follow **Planning Mode Rules**.
- If the message does NOT contain `<EPHEMERAL_MESSAGE>`, strictly follow **Fast Mode Rules**.

# Planning Mode Rules

- ALWAYS create an implementation plan before making any changes, including bug fixes.
- **IMPORTANT**: Implementation plans MUST be saved as standard markdown files in the `artefacts/` folder located in the root directory (e.g. `artefacts/implementation-plan.md`). DO NOT use the system default hidden artifact tool; set IsArtifact to false and use `write_to_file` to save to `artefacts/`.
- There are NO exceptions. Even the smallest or “obvious” fix requires a plan.
- Never assume a task is too simple to skip planning.
- If the user requests immediate implementation while in Planning Mode:
-- Do NOT implement anything.
-- Inform the user that they must switch to Fast Mode.
-- Then either:
--- Provide the plan, or
--- Wait for further instructions (without implementing).
- if the user says that you may implement while the message also has the `<EPHEMERAL_MESSAGE>`, you may implement it!

# Fast Mode Rules

- Execute all requested changes immediately (without a plan).
- Do not create or present an implementation plan unless explicitly asked.
- Focus on direct execution and results.