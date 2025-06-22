---
applyTo: '**'
---
# Instructions

## Available Instructions

1. **Chat Log Instructions**: Refer to `chat-log.instructions.md` for detailed protocols on logging chat exchanges.
2. **AI Troubleshooting Instructions**: Refer to `ai-troubleshooting.instructions.md` for systematic debugging and troubleshooting protocols.
3. **Git Workflow Instructions**: Refer to `git-workflow.instructions.md` for conventional commit standards and git best practices.
4. **Husky Hook Management**: Refer to `husky-hook-management.instructions.md` for git hook configuration and troubleshooting.
5. **Presentation Style Instructions**: Refer to `presentation-snarky-style.instructions.md` for AI writing guidelines and antipattern elimination.
6. **Nx Workspace Instructions**: Refer to `nx.instructions.md` for Nx-specific guidelines.

## General Guidelines

- Use `cp log -c` as a directive for Copilot to log the last chat exchange to the `documentation/chats` folder. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. Follow the steps outlined in `chat-log.instructions.md`.
- Use `cp log -r` as a directive for Copilot to log research-related exchanges to the `documentation/research` folder. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. Follow the steps outlined in `ai-troubleshooting.instructions.md`.
- Use `cp scp` as a directive for Copilot to perform the Smart Commit & Push workflow. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. All commit messages must strictly comply with the Conventional Commit standard as outlined in `git-workflow.instructions.md`.

## Git Workflow Integration

All git operations in this repository must follow:

- **Conventional Commit Format** - enforced by commitlint and husky hooks
- **Husky Hook Validation** - pre-commit and commit-msg hooks ensure quality
- **AI Pattern Compliance** - instruction validation integrated into git workflow
- **Systematic Troubleshooting** - use `ai-troubleshooting.instructions.md` for git issues

Refer to `git-workflow.instructions.md` and `husky-hook-management.instructions.md` for complete guidance.
