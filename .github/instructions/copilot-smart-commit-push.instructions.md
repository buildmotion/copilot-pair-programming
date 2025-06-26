---
applyTo: "**"
---

# `cp scp` (Smart Commit & Push) Workflow

## Overview

The `cp scp` workflow is a fully automated process for committing and pushing changes to a Git repository using GitHub Copilot. It adheres to Single Responsibility (SR) and Separation of Concerns (SoC) principles, using conventional commit standards.

## Related Instructions

This instruction focuses specifically on the Copilot SCP automation workflow. For related topics:

- **Git workflow and conventional commits**: [`git-workflow.instructions.md`](git-workflow.instructions.md)
- **Husky hook configuration and troubleshooting**: [`husky-hook-management.instructions.md`](husky-hook-management.instructions.md)
- **Detailed execution template**: [`../prompts/commit-and-push.prompt.md`](../prompts/commit-and-push.prompt.md)
- **Main instruction index**: [`instructions.md`](instructions.md)

## How to Use

Simply type **"`cp scp`"** in the chat with GitHub Copilot. This is a direct command to Copilot that triggers the `cp scp` workflow. 

**Alternative**: You can also use the detailed prompt template directly with `#prompt commit-and-push.prompt.md` for more explicit control over the execution steps.

Copilot will:

1. Generate a single command line that performs all the necessary Git operations
2. Execute this command automatically
3. Report the results back to you

## Workflow Steps (Performed by Copilot)

1. **Stage Changes**: Automatically stage all changes using `git add .`

2. **Analyze Changes**: Examine the changes to determine the most appropriate commit type and summary

3. **Commit Changes**: Create a conventional commit message based on the analysis, including:
   - A properly formatted commit header with type, scope, and description
   - Any necessary footers (breaking changes, etc.)

4. **Push Changes**: Push the commit to the remote repository

## Explicit Trigger for `cp scp` Command

Typing "`cp scp`" in the chat explicitly triggers the `cp scp` workflow. Ensure that Copilot is configured to recognize this command and execute the workflow as described.

## Key Features

- **Direct Copilot Automation**: The process is performed entirely by the Copilot Agent using a single command line

- **No Scripts or Tasks**: The SCP workflow does not use VS Code tasks, npm scripts, or any external scripts

- **Zero User Interaction**: After typing "scp" to Copilot, no further user input is required

## Conventional Commit Compliance

The `cp scp` workflow automatically generates commit messages that comply with [Conventional Commit standards](git-workflow.instructions.md#conventional-commit-standards). Copilot will analyze your changes and select the appropriate commit type and format.

> **📋 Reference:** For complete conventional commit standards and validation rules, see [`git-workflow.instructions.md`](git-workflow.instructions.md#conventional-commit-standards).

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

After executing the SCP workflow, validate the following:

1. Run `git log -1` to view the latest commit and ensure it matches the generated commit message.
2. Verify that the changes have been pushed to the remote repository by checking the repository's commit history.

You can verify manually with:

- `git log -1` to view the latest commit
- Check your remote repository to confirm the changes were pushed

## Troubleshooting

### If SCP Doesn't Work

If typing "`cp scp`" doesn't trigger the expected behavior:

- Make sure you're using the latest version of GitHub Copilot
- Try being more explicit, e.g., "Please run SCP to commit and push my changes"
- If necessary, specify the branch with "`cp scp` to [branch name]"

### SCP-Specific Issues

- **Merge conflicts**: Copilot will notify you if there are conflicts that need manual resolution
- **Uncommitted changes**: Copilot will stage all changes before committing
- **Permission issues**: Ensure you have proper permissions for the repository

> **🔧 Advanced Troubleshooting:** For git workflow issues, husky hook problems, or commit validation errors, see:
>
> - [`git-workflow.instructions.md`](git-workflow.instructions.md#troubleshooting-hooks) for git workflow troubleshooting
> - [`husky-hook-management.instructions.md`](husky-hook-management.instructions.md) for husky-specific issues

## Security Considerations

- Copilot will never include sensitive information in commit messages
- Always review the generated commit message before confirming (if Copilot asks for confirmation)
- Use `.gitignore` to exclude sensitive files from being committed

> **📋 Reference:** For complete git security best practices, see [`git-workflow.instructions.md`](git-workflow.instructions.md#git-workflow-best-practices)

---

This workflow provides a seamless, efficient way to commit and push changes with intelligent, convention-based commit messages - all through a simple "`cp scp`" command to GitHub Copilot.
