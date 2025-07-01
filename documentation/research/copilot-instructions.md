# Optimizing Chat Prompts for Copilot: A Comprehensive Guide

## Introduction
This document serves as a guide to understanding and utilizing instructions extracted from the `agentInstructions.tsx` file in the Copilot Chat extension. It provides detailed commentary on each instruction, explaining their purpose, importance, and how they work. Additionally, it offers strategies for optimizing chat interactions with Copilot to ensure effective and efficient communication.

---

## Commentary on Instructions

### General Agent Instructions
- **Purpose**: Defines the role of the coding agent and its capabilities.
- **Guidance**: The agent is described as highly sophisticated with expert-level knowledge across multiple programming languages and frameworks. It can perform tasks and provide answers requiring extensive research and context.
- **Optimization Tips**: Ensure prompts are specific and provide enough context for the agent to infer the project type and relevant tools.

---

### Tool Usage Guidelines
- **Purpose**: Provides instructions on how the agent should use tools effectively.
- **Guidance**:
  - Follow the JSON schema carefully while invoking tools.
  - Avoid mentioning tool names to users; describe actions instead (e.g., "I'll run the command in a terminal").
  - Prefer calling tools in parallel, except for certain tools like `Codebase`.
- **Optimization Tips**: When requesting actions, specify the desired outcome rather than the tools to use. For example, "Search for all instances of X in the codebase" instead of "Use the FindTextInFiles tool."

---

### File Editing Instructions
- **Purpose**: Guides the agent on editing files in the workspace.
- **Guidance**:
  - Read files before making edits.
  - Use tools like `ReplaceString` and `EditFile` for precise changes.
  - Group changes by file and provide concise descriptions of edits.
- **Optimization Tips**: Clearly define the changes needed and provide context (e.g., lines of code, file paths) to help the agent identify the correct edit location.

---

### Code Search Mode Instructions
- **Purpose**: Explains the approach for handling tasks related to the user's workspace.
- **Guidance**:
  - Break down user requests into smaller concepts to determine relevant files.
  - Use tools like `Codebase` for semantic searches and `FindTextInFiles` for keyword searches.
- **Optimization Tips**: Frame questions to specify whether the focus is on high-level concepts or detailed code searches.

---

### Terminal Command Guidelines
- **Purpose**: Provides rules for using terminal commands effectively.
- **Guidance**:
  - Run one command at a time and wait for output before proceeding.
  - Avoid editing files via terminal commands unless explicitly requested.
- **Optimization Tips**: Include commands directly in the prompt when terminal actions are required.

---

### Response Formatting
- **Purpose**: Ensures answers are presented clearly to users.
- **Guidance**:
  - Use Markdown formatting for filenames and symbols.
  - Provide fully qualified links for referenced symbols and workspace files.
- **Optimization Tips**: Request output in Markdown format for easy readability and integration into documentation.

---

### Notebook Editing Instructions
- **Purpose**: Outlines rules for editing notebook files.
- **Guidance**:
  - Use tools like `EditNotebook` and `RunNotebookCell` for notebook-specific tasks.
  - Avoid referencing Notebook Cell IDs; use cell numbers instead.
- **Optimization Tips**: Clearly distinguish between notebook edits and general file edits in prompts.

---

### ReplaceString Tool Guidelines
- **Purpose**: Details the process for using the `ReplaceString` tool effectively.
- **Guidance**:
  - Provide absolute file paths and extensive context (3-5 lines before and after the edit point).
  - Plan separate tool calls for each instance of a change.
- **Optimization Tips**: Specify unique identifiers for edits to avoid conflicts or unintended changes.

---

### ApplyPatch Tool Guidelines
- **Purpose**: Provides formatting rules for applying patches.
- **Guidance**:
  - Use a structured format with proper context and indentation.
  - Avoid printing patch instructions to users; apply changes directly via the tool.
- **Optimization Tips**: Include all necessary context in prompts when requesting patch applications.

---

## How to Optimize Chat Prompts for Copilot

### Provide Clear Context
- State the problem or task explicitly and include relevant details like filenames, code snippets, or expected outcomes.
- Example: "Modify the `Person` class in `src/models/person.ts` to include a new method for calculating BMI."

### Use Precise Language
- Avoid vague or ambiguous requests. Define terms and actions clearly.
- Example: "Search for all instances of `getAge` in the codebase" instead of "Find the function."

### Leverage Tool-Specific Instructions
- Tailor prompts to align with tool capabilities and constraints.
- Example: "Replace all instances of `var` with `let` in `utils.js` and ensure the changes maintain correct code indentation."

### Request Step-by-Step Guidance
- Ask for detailed explanations or incremental edits to ensure clarity and accuracy.
- Example: "Provide the steps to refactor the `calculateInterest` function in `finance.js`."

### Specify Output Formatting
- Request answers in Markdown for easy integration into documentation or reports.
- Example: "Provide a Markdown summary of changes made to `app.js`."

---

## Conclusion
By adhering to these instructions and optimization strategies, users can maximize the effectiveness of their interactions with Copilot. Clear and precise prompts, aligned with tool-specific guidelines, ensure accurate and efficient task completion.