---
trigger: always_on
---

# Logging Protocol: Changelog Management

This protocol is mandatory for all AI agents and contributors working on the Great Awakening Research Project. Every file modification, creation, or deletion MUST be recorded in the folder LOG in the `changelog.log` file.

## 📝 Logging Rules

### 1. Timing
The log entry must be created or updated immediately after the associated file operation is completed.

### 2. Format
Each entry must occupy a single line and follow this exact timestamped format:
"[HH:MM DD/MM/YYYY] `file.extension` - description_of_change"

- **HH:MM**: 24-hour timestamp (Current local time).
- **DD/MM/YYYY**: Current date.
- **file.extension**: The relative path and name of the modified file.
- **description**: A concise summary of the specific changes made.

### 3. Granularity
- One line per file.
- If a single task involves 5 files, 5 separate lines must be added to the log.
- Use a new line for each entry; do not overwrite previous logs.

## 🚀 Execution Logic
1. Perform file operation (Create/Edit/Delete).
2. Get current system timestamp.
3. Append formatted line to `LOG/changelog.log`.
4. Proceed to next task.