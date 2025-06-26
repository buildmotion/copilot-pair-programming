# Research: Best Practices for Constructing Copilot Custom Instructions

## Purpose

This document outlines best practices for creating effective custom instructions for GitHub Copilot, specifically those stored in the `.github/instructions` folder. These instructions are designed to guide Copilot's behavior and enhance its functionality for specific workflows.

---

## Key Principles

### 1. **Clarity and Structure**

- Use clear and structured formatting, such as headings, bullet points, and code blocks.

- Ensure instructions are easy to read and follow.

- Example:

  ```markdown
  ## Instruction: Log Chat Exchanges

  - Log the last chat exchange to the `documentation/chats` folder.
  - Use the format specified in `chat-log.instructions.md`.
  ```

### 2. **Specificity**

- Define precise actions and expected outcomes.

- Example:

  ```markdown
  ## Instruction: Commit Changes

  - Use the `cp scp` command to stage, commit, and push changes.
  - Ensure commit messages follow the Conventional Commits format.
  ```

### 3. **Context Awareness**

- Include relevant context, such as file paths, environment variables, or dependencies.

- Example:

  ```markdown
  ## Instruction: Start GitHub MCP Server

  - Run the following command to start the server:

    ```sh
    docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here ghcr.io/github/github-mcp-server
    ```

  ```

### 4. **Actionable Steps**

- Break down instructions into actionable steps.

- Example:

  ```markdown
  ## Instruction: Generate Documentation

  1. Navigate to the `workspace` directory.
  2. Run the `generate-docs` task using Nx.
  3. Verify the output in the `docs/` folder.
  ```

### 5. **Validation and Testing**

- Include steps to validate the results of the instructions.

- Example:

  ```markdown
  ## Instruction: Validate Commit

  - Run `git log -1` to verify the latest commit.
  - Ensure the commit message matches the Conventional Commits format.
  ```

---

## Instruction Categories

### 1. **Git Operations**

- Automate tasks like staging, committing, and pushing changes.

- Example:

  ```markdown
  ## Instruction: Smart Commit & Push

  - Use the `cp scp` command to automate the Git workflow.
  - Ensure all changes are staged and committed with a detailed message.
  ```

### 2. **Logging**

- Capture and store logs for debugging or documentation purposes.

- Example:

  ```markdown
  ## Instruction: Log Chat Exchanges

  - Append the last chat exchange to the `documentation/chats` folder.
  - Use the format specified in `chat-log.instructions.md`.
  ```

### 3. **Server Management**

- Start, stop, or configure servers.

- Example:

  ```markdown
  ## Instruction: Start GitHub MCP Server

  - Run the following command to start the server:

    ```sh
    docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here ghcr.io/github/github-mcp-server
    ```

  ```

### 4. **Task Execution**

- Run specific tasks or scripts.

- Example:

  ```markdown
  ## Instruction: Generate HTML

  - Run the `generate-html` task using Yarn.
  - Verify the output in the `presentation/` folder.
  ```

### 5. **Validation**

- Ensure outputs meet expected standards.

- Example:

  ```markdown
  ## Instruction: Validate Documentation

  - Check the `docs/` folder for completeness and accuracy.
  - Ensure all files are properly formatted.
  ```

---

## Best Practices for Writing Custom Instructions

### 1. **Use Markdown Formatting**

- Leverage markdown for clarity and structure.

- Include headings, lists, and code blocks.

### 2. **Follow Naming Conventions**

- Use descriptive filenames for instructions, such as `ai-troubleshooting.instructions.md`.

### 3. **Include Examples**

- Provide sample commands or expected outputs.

### 4. **Test Instructions**

- Validate instructions in a controlled environment before deployment.

### 5. **Iterative Refinement**

- Update instructions based on user feedback and evolving requirements.

---

## Resources

### GitHub Copilot Documentation

- [GitHub Copilot Features](https://github.com/features/copilot)

- [Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot)

### Related Tools

- [Conventional Commits](https://www.conventionalcommits.org/)

- [Nx Workspace](https://nx.dev/)

---

## Conclusion

By following these best practices, users can create effective custom instructions that enhance GitHub Copilot's functionality and streamline workflows. Structured, actionable, and context-aware instructions ensure high-quality outputs and improve collaboration between developers and AI tools.
