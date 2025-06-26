---
applyTo: '**'
---
# Instructions

## Available Instructions

1. **Chat Log Instructions**: Refer to `chat-log.instructions.md` for detailed protocols on logging chat exchanges.
2. **AI Troubleshooting Instructions**: Refer to `ai-troubleshooting.instructions.md` for systematic debugging and troubleshooting protocols.
3. **Git Workflow Instructions**: Refer to `git-workflow.instructions.md` for conventional commit standards and git best practices.
4. **Husky Hook Management**: Refer to `husky-hook-management.instructions.md` for git hook configuration and troubleshooting.
5. **Copilot Smart Commit & Push**: Refer to `copilot-smart-commit-push.instructions.md` for automated git workflow using the `cp scp` command.
6. **Presentation Style Instructions**: Refer to `presentation-style-snarky.instructions.md` for AI writing guidelines and antipattern elimination.
7. **Nx Workspace Instructions**: Refer to `nx.instructions.md` for Nx-specific guidelines.

## Copilot Directives

- **`cp scp`**: Smart Commit & Push - stage all changes, generate conventional commit message, and push. Uses [copilot-smart-commit-push.instructions.md](copilot-smart-commit-push.instructions.md) for behavior context and [commit-and-push.prompt.md](../prompts/commit-and-push.prompt.md) for execution details.
- **`cp log -c`**: Log chat exchange to `documentation/chats/` folder. Follow steps in `chat-log.instructions.md`.
- **`cp log -r`**: Log research exchange to `documentation/research/` folder. Follow steps in `ai-troubleshooting.instructions.md`.

## Git Workflow Integration

All git operations in this repository must follow:

- **Conventional Commit Format** - enforced by commitlint and husky hooks
- **Husky Hook Validation** - pre-commit and commit-msg hooks ensure quality
- **AI Pattern Compliance** - instruction validation integrated into git workflow
- **Systematic Troubleshooting** - use `ai-troubleshooting.instructions.md` for git issues

Refer to `git-workflow.instructions.md` and `husky-hook-management.instructions.md` for complete guidance.
