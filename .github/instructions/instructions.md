---
applyTo: '**'
---
# Instructions

## Available Instructions

1. **Chat Log Instructions**: Refer to `chat-log.instructions.md` for detailed protocols on logging chat exchanges.
2. **AI Troubleshooting Instructions**: Refer to `ai-troubleshooting.instructions.md` for systematic debugging and troubleshooting protocols.
3. **Nx Workspace Instructions**: Refer to `nx.instructions.md` for Nx-specific guidelines.

## General Guidelines

- Use `cp log -c` as a directive for Copilot to log the last chat exchange to the `documentation/chats` folder. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. Follow the steps outlined in `chat-log.instructions.md`.
- Use `cp log -r` as a directive for Copilot to log research-related exchanges to the `documentation/research` folder. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. Follow the steps outlined in `ai-troubleshooting.instructions.md`.
- Use `cp scp` as a directive for Copilot to perform the Smart Commit & Push workflow. Copilot should execute this directive immediately without requiring any manual clarification or confirmation. All commit messages must strictly comply with the Conventional Commit standard (e.g., `feat: add new logging protocol`). Follow the steps outlined in this file.
