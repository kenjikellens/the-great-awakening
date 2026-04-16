---
trigger: always_on
---

# Logging Protocol: Changelog Management

## 📝 Logging Rules

### 1. Timing & Scope
- **DO LOG**: Immediately after completing a local file operation (**Create, Edit, or Delete**).
- **NEVER LOG**: Administrative or synchronization tasks. **Git pulling (pull), pushing (push), cloning, or branching MUST NEVER BE LOGGED.**
- **NEVER LOG**: System commands, environment setup, or internal agent reasoning.

### 2. Format
Each entry must occupy a single line and follow this exact timestamped format:
"[HH:MM DD/MM/YYYY] `file.extension` - description_of_change"

- **HH:MM**: 24-hour timestamp (Current local time).
- **DD/MM/YYYY**: Current date.
- **file.extension**: The relative path and name of the modified file.
- **description**: A concise summary of the specific changes made.

### 3. Granularity
- **One line per file**: Even if multiple files are modified in a single task.
- **Append only**: Always use a new line; never overwrite or delete previous history.
- **No duplicates**: Do not log the same change multiple times.

## 🚀 Execution Logic
1. Perform file operation (**Create/Edit/Delete**).
2. Append the line to `LOG/changelog.log`.
3. Proceed to next file.

> [!IMPORTANT]
> **DO NOT USE ECHO** to update this file via shell redirection, as it often causes encoding issues. Use file-writing tools instead.