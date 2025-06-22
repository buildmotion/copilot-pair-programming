---
applyTo: '**'
---
# Instructions

## Copilot/GitHub AI Instructions

### Automatic Chat Logging System

- **AUTOMATIC LOGGING**: Always append new entries to the current timestamped log file (specified in `LOG_FILE_PATH` environment variable) after each chat session
- **No Manual Intervention**: System should automatically log without user action
- **Format**: Use Mountain/MST timezone timestamps with unique IDs and `---` separators
- **Entry Structure**: Include prompts, responses, commands run, and code samples
- When a prompt is entered, record it as: `> prompt: <prompt_text_here>`
- Include all commands run, markdown explanations, and sample code
- Use clear section headings with date and time for each session

### Workspace Directory Guidelines

- For any code, Nx, or Angular related commands or patches, always use the terminal or apply patches within the `workspace` directory, not the root of the repository.
  - Before running a command, determine if the terminal is already at the `workspace` folder. If so, no directory change (cd) is required; otherwise, change into the `workspace` directory first.

## Coding

Coding standards, domain knowledge, and preferences that AI should follow.

If the application or file is part of an Angular application or library project, please use:

> Use get-library-docs to fetch information about Angular’s [topic] from /angular/angular.

---

## GitHub MCP for Git-Related Tasks

- For all Git-related tasks, Copilot should use the GitHub MCP server configured in the `settings.json` file.
- Ensure the `GITHUB_PERSONAL_ACCESS_TOKEN` is set correctly in the `.env` file or provided when prompted.
- Example command to run the GitHub MCP server manually:

  ```sh
  docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here ghcr.io/github/github-mcp-server
  ```

- Verify the server is running by checking the logs or testing a Git-related task.

- If the server is not running, ensure the Docker container for the GitHub MCP server is started. You can verify this using Docker Desktop or by running the following command to list running containers:

  ```sh
  docker ps
  ```

- If the container is not running, start it using the following command:

  ```sh
  docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here ghcr.io/github/github-mcp-server
  ```

### Commit Instructions

- When asked to commit from chat, perform the following steps without fail:
  1. Run `git add .` to stage all changes.
  2. Use the `context7` tool to generate a commit message following the [Conventional Commits](https://www.conventionalcommits.org/) standard. The tool will ensure the message adheres to the guidelines and leverages the "Conventional Commits" doc library for consistency.
     - Example command to generate a commit message:

       ```sh
       context7 commit --use-conventional-commits
       ```

  3. Review the generated commit message to ensure it accurately describes the changes made.
  4. Commit the changes using the generated commit message.
     - Example:

       ```sh
       git commit -m "<generated_commit_message>"
       ```

  5. Verify the commit by running `git log --oneline` to ensure the changes are recorded.

- Ensure the commit message is clear, concise, and follows the "Conventional Commits" format.

### Execute in Terminal Using GitHub MCP

- When executing commands in the terminal, use the GitHub MCP server to handle Git-related tasks without asking for confirmation.
- Ensure the GitHub MCP server is running before executing commands. If not, start it using:

  ```sh
  ./scripts/mcp/start-mcp-github.sh
  ```

- For commit-related operations, always use `context7` to generate commit messages. Example:

  ```sh
  context7 commit --use-conventional-commits
  ```

- Example command execution for GitHub MCP:

  ```sh
  docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here ghcr.io/github/github-mcp-server
  ```

### Logging Chat Sessions

For detailed instructions on automatic logging of GitHub Copilot chat sessions, refer to the `.github/instructions/auto-script.instructions.md` file. This file contains the source of truth for managing automatic logging, including setup, format, and troubleshooting.

## Nx Workspace Location

- The Nx Workspace is now located at the root of the repository. Ensure all Nx-related commands and configurations are executed or applied directly within the root directory.

## Custom Commands

---

## Custom Commands & Scripts

### "scp" Command - Smart Commit & Push (Copilot Automation)

When the user types **"scp"** in a chat with GitHub Copilot, Copilot directly generates and executes a single command line that performs the complete git workflow:

**Direct Copilot Command Workflow**:

1. **Analyze Changes**: Copilot uses `git status --porcelain` to detect all modifications
2. **Examine Diffs**: Copilot reviews actual file changes using `git diff` for context
3. **Generate Smart Commit**: Copilot creates a detailed conventional commit with:
   - **Type & Scope**: Based on modified files (feat, docs, chore, etc.)
   - **Title**: Concise description of main changes
   - **Body**: Detailed bullet points of specific modifications
   - **Breaking Changes**: If applicable
4. **Execute Single Command**: Copilot generates and runs a single command line that:
   - Stages all changes (`git add .`)
   - Creates the commit with the generated message (`git commit`)
   - Pushes the changes to the remote repository (`git push`)

**Intelligent Commit Generation**:

```bash
# Copilot analyzes and creates commits like:
feat(extension): upgrade auto-logger to v2.0.1

- Update package.json version to 2.0.1
- Add new extension binary auto-logger-2.0.1.vsix
- Improve clipboard monitoring with better error handling
- Add diagnostic commands for troubleshooting
- Update installation instructions in documentation

BREAKING CHANGE: Extension now requires VS Code 1.101.0+
```

**File Pattern Recognition**:

- `extensions/` → `feat(extension)` or `fix(extension)`
- `.github/instructions/` → `docs(instructions)`
- `package.json` → `chore(deps)` or `chore(scripts)`
- `*.md` → `docs`
- `test/`, `spec/` → `test`
- Build/config files → `chore`

**No Scripts Required**: Copilot handles everything using available tools without external dependencies.

**Usage**: Simply type "scp" in a conversation with GitHub Copilot for automatic change summary, conventional commit, and push - all in a single operation.

---

When committing changes to the repository, always use the "Conventional Commits" format for commit messages. This ensures consistency and clarity in the commit history. Commit messages must always use lowercase characters.

### Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: a new feature
- **fix**: a bug fix
- **docs**: documentation only changes
- **style**: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: a code change that neither fixes a bug nor adds a feature
- **perf**: a code change that improves performance
- **test**: adding missing tests or correcting existing tests
- **chore**: changes to the build process or auxiliary tools and libraries such as documentation generation

### Example

```text
feat(auth): add login functionality

added a new login feature to the authentication module. this includes:
- login form
- api integration
- error handling

breaking change: the authentication module now requires a new environment variable `auth_api_url`.
```

# Enhanced AI Assistant Instructions

## Available Instructions

1. **Code Troubleshooting:** Refer to `ai-troubleshooting.instructions.md` for systematic debugging protocols.
2. **Nx Workspace:** Refer to `nx.instructions.md` for Nx-specific guidelines.
3. **Chat Log:** Refer to `chat-log.instructions.md` for logging the last chat exchange.

## General Guidelines

- Use `log -c` as a directive for Copilot to log the last chat exchange to the `documentation/chats` folder. This is not a terminal command but an instruction for Copilot to follow the steps outlined in `chat-log.instructions.md`.
- Use `log -r` to log to the `documentation/research` folder. Refer to `ai-troubleshooting.instructions.md` for systematic research logging protocols.
- Always follow the specific instruction relevant to the task.
- Use structured responses and markdown formatting for clarity.
- Provide suggestions for improving prompts to enhance learning and context.

### `x -scp` Command - Smart Commit & Push

Refer to the `scp.md` file for detailed instructions on using the `x -scp` workflow. This command automates the process of staging, committing, and pushing changes to a Git repository using GitHub Copilot.
