---
trigger: model_decision
description: Check for a system-injected `<EPHEMERAL_MESSAGE>` containing a `<planning_mode>` block in the LATEST message that got sent. - If the message contains `<EPHEMERAL_MESSAGE>`, strictly follow THIS RULE
---


# Planning Mode Rules

- ALWAYS create an implementation plan before making any changes, including bug fixes.
- There are NO exceptions. Even the smallest or “obvious” fix requires a plan.
- Never assume a task is too simple to skip planning.
- If the user requests immediate implementation while in Planning Mode:
-- Do NOT implement anything.
-- Inform the user that they must switch to Fast Mode.
-- Then either:
--- Provide the plan, or
--- Wait for further instructions (without implementing).
- if the user says that you may implement while the message also has the `<EPHEMERAL_MESSAGE>`, you may implement it!