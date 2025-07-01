# Enhancing Copilot Chat with Effective Agent Instructions

## Introduction
This document serves as a comprehensive guide to understanding and leveraging the `agentInstructions.tsx` file from the Copilot Chat extension. It outlines the purpose, functionality, and best practices for each instruction, providing insights into their relevance and operation. Additionally, it offers strategies to optimize chat prompts for better communication with Copilot.

---

## Key Instructions and Commentary

### General Agent Instructions
- **Purpose**: Establishes the capabilities of the coding agent.
- **Details**: The agent is described as highly sophisticated and knowledgeable across diverse programming languages and frameworks.
- **Importance**: This foundational description helps define the scope and expectations from the agent.
- **Optimization Tips**: Provide detailed and relevant context in prompts to enable the agent to perform effectively.

---

### Tool Usage Guidelines
- **Purpose**: Provides a framework for using tools effectively.
- **Details**:
  - Follow JSON schemas carefully.
  - Avoid directly naming tools when communicating with users; instead, describe actions.
  - Prefer parallel tool calls where applicable.
- **Importance**: Ensures efficient and accurate tool usage, minimizing errors in responses.
- **Optimization Tips**: Frame requests in terms of desired actions rather than specific tools to leverage these guidelines.

---

### File Editing Best Practices
- **Purpose**: Guides the agent on making edits to files in the workspace.
- **Details**:
  - Always read files before editing.
  - Group changes by file and provide concise descriptions.
  - Use tools like `ReplaceString` and `EditFile` for precise changes.
- **Importance**: Ensures edits are relevant, accurate, and do not disrupt the codebase.
- **Optimization Tips**: Specify file paths and context for edits to help the agent identify the correct locations and actions.

---

### Code Search Mode Instructions
- **Purpose**: Details the approach for workspace-specific tasks.
- **Details**:
  - Break down user requests into smaller concepts.
  - Use semantic searches and keyword searches based on the task.
- **Importance**: Helps in efficiently locating relevant code sections or files.
- **Optimization Tips**: Clarify whether the task is focused on high-level concepts or precise code searches.

---

### Terminal Commands and Guidelines
- **Purpose**: Provides rules for executing terminal commands.
- **Details**:
  - Run commands sequentially and wait for output.
  - Avoid editing files via terminal commands unless explicitly requested.
- **Importance**: Prevents errors and ensures logical execution flow.
- **Optimization Tips**: Integrate specific terminal commands directly into prompts when necessary.

---

### Response Formatting Instructions
- **Purpose**: Standardizes the format of agent responses.
- **Details**:
  - Use Markdown formatting for files and symbols.
  - Include fully qualified links for referenced symbols and files.
- **Importance**: Enhances readability and usability of responses.
- **Optimization Tips**: Request Markdown-formatted responses for seamless integration into documentation.

---

### Notebook Editing Instructions
- **Purpose**: Provides rules for editing notebook files.
- **Details**:
  - Use specific tools for notebook-related tasks.
  - Avoid referencing Notebook Cell IDs; use cell numbers instead.
- **Importance**: Maintains accuracy and clarity in notebook interactions.
- **Optimization Tips**: Clearly specify notebook-related tasks in prompts.

---

### ReplaceString Tool Guidelines
- **Purpose**: Explains the process for using the ReplaceString tool.
- **Details**:
  - Provide absolute file paths and extensive context for edits.
  - Ensure uniqueness of the target string for accurate replacements.
- **Importance**: Prevents unintended changes and ensures precise edits.
- **Optimization Tips**: Include unique identifiers and detailed context in prompts to facilitate accurate string replacements.

---

### ApplyPatch Tool Guidelines
- **Purpose**: Provides instructions for applying patches.
- **Details**:
  - Use structured formats with proper context and indentation.
  - Avoid displaying patch instructions; apply changes directly.
- **Importance**: Ensures patches are applied accurately and efficiently.
- **Optimization Tips**: Provide detailed patch descriptions and context in prompts.

---

### Search Instructions
- **Purpose**: Guides efficient codebase searches.
- **Details**:
  - Use specific tools like `FindFiles` and `FindTextInFiles` based on the target.
  - Run parallel searches for efficiency.
- **Importance**: Optimizes the search process for locating relevant code elements.
- **Optimization Tips**: Specify precise search criteria to leverage these guidelines.

---

## How to Optimize Copilot Chat Prompts

### Be Specific and Contextual
- Clearly define tasks and include relevant details like file paths, code snippets, or expected outcomes.
- Example: "Modify the `Person` class in `src/models/person.ts` to include a new `calculateBMI` method."

### Frame Questions Effectively
- Avoid ambiguous or vague requests. Use precise language and define terms clearly.
- Example: "Search for all instances of the `getAge` function in the codebase" instead of "Find the function."

### Align with Tool Capabilities
- Tailor prompts to align with available tools and their constraints.
- Example: "Replace all instances of `var` with `let` in `utils.js`" instead of "Change `var` to `let`."

### Request Step-by-Step Guidance
- Ask for detailed explanations or incremental edits to ensure clarity and accuracy.
- Example: "Provide the steps to refactor the `calculateInterest` function in `finance.js`."

### Specify Output Formatting
- Request responses in Markdown format for easy integration into documentation or reports.
- Example: "Provide a Markdown summary of changes made to `app.js`."

---

## Conclusion
By understanding and applying the instructions outlined in `agentInstructions.tsx`, users can optimize their interactions with Copilot Chat. Clear, specific prompts aligned with tool capabilities ensure effective and accurate task completion.