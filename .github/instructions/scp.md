# SCP (Smart Commit & Push) Workflow

## Overview

The SCP workflow is a fully automated process for committing and pushing changes to a Git repository using GitHub Copilot. It adheres to Single Responsibility (SR) and Separation of Concerns (SoC) principles, using conventional commit standards.

## How to Use

Simply type **"scp"** in the chat with GitHub Copilot. This is a direct command to Copilot that triggers the SCP workflow. Copilot will:

1. Generate a single command line that performs all the necessary Git operations
2. Execute this command automatically
3. Report the results back to you

## Workflow Steps (Performed by Copilot)

1. **Stage Changes**: Automatically stage all changes using `git add .`

2. **Analyze Changes**: Examine the changes to determine the most appropriate commit type and summary

3. **Commit Changes**: Create a conventional commit message based on the analysis, including:
   - A properly formatted commit header with type, scope, and description
   - A detailed body that summarizes the changes
   - Any necessary footers (breaking changes, etc.)

4. **Push Changes**: Push the commit to the remote repository

## Key Features

- **Direct Copilot Automation**: The process is performed entirely by the Copilot Agent using a single command line

- **No Scripts or Tasks**: The SCP workflow does not use VS Code tasks, npm scripts, or any external scripts

- **Zero User Interaction**: After typing "scp" to Copilot, no further user input is required

## Conventional Commit Standards

Copilot will automatically generate commit messages following this format:

```plaintext
<type>(<scope>): <description>

[detailed body with bullet points or paragraphs explaining changes]

[optional footer(s) for breaking changes or references]
```

### Types (Automatically Selected by Copilot)

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Example of What Copilot Will Generate

```plaintext
feat(auto-logger): update extension diagnostics and improve logging

- Added diagnostic logging to CopilotAutoLogger.ts
- Updated ConfigurationManager.ts to handle workspace-specific settings
- Improved error handling in ClipboardMonitor.ts
- Updated documentation for extension usage

This change maintains backward compatibility.
```

## How It Works Behind the Scenes

When you type "scp", Copilot will:

1. Use `git status --porcelain` to analyze your changed files
2. Examine the diffs with `git diff` to understand the content changes
3. Generate an appropriate conventional commit message based on this analysis
4. Create and execute a single Git command that:
   - Stages all changes
   - Creates the commit with the generated message
   - Pushes the changes to the remote repository

## Validation

After Copilot executes the SCP workflow, you'll see:

1. A summary of what Copilot did (staged, committed, pushed)
2. The full commit message that was generated
3. The Git command output showing successful push

You can verify manually with:

- `git log -1` to view the latest commit
- Check your remote repository to confirm the changes were pushed

## Troubleshooting

### If SCP Doesn't Work

If typing "scp" doesn't trigger the expected behavior:

- Make sure you're using the latest version of GitHub Copilot
- Try being more explicit, e.g., "Please run SCP to commit and push my changes"
- If necessary, specify the branch with "scp to [branch name]"

### Git-Related Issues

- **Merge conflicts**: Copilot will notify you if there are conflicts that need manual resolution
- **Permission issues**: Ensure you have proper permissions for the repository
- **Uncommitted changes**: Copilot will stage all changes before committing

## Security Considerations

- Copilot will never include sensitive information in commit messages
- Always review the generated commit message before confirming (if Copilot asks for confirmation)
- Use `.gitignore` to exclude sensitive files from being committed

---

This workflow provides a seamless, efficient way to commit and push changes with intelligent, convention-based commit messages - all through a simple "scp" command to GitHub Copilot.
