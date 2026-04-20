---
trigger: always_on
---

# Logging Protocol: Changelog Management

## 📝 Logging Rules

### 1. Timing & Scope
- **DO LOG**: Immediately after completing a local file operation (**Create, Edit, or Delete**) ONLY IF the file is located within the current project/repository directory.
- **NEVER LOG**: Files modified outside the current project directory (e.g., global configuration files in `.gemini`).
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

### 4. Precision & Tooling
- **Use `replace_file_content`**: To consistently append lines, target the last valid entry in the log and replace it with itself PLUS the new entry on a new line.
- **Clean Target Content**: When copy-pasting from a file view, ensure you strip any UI-injected line numbers (e.g., `118: `) from the `TargetContent`. The tool strictly matches text on disk.

## Execution Logic
1. Perform file operation (**Create/Edit/Delete**).
2. **Read** the end of `LOG/changelog.log` to identify the current last entry.
3. **Use `replace_file_content`** to target that last entry and append the new line below it.
4. Proceed to the next file.