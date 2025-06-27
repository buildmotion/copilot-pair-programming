# MCP Server for LLM Apps

> Aniket Wattamwar
> [reddit mcp](https://github.com/aniketwattamwar/reddit-mcp)

## Introduction

- RAG has limitations with size/number embeddings
- Agentic: tools to acceess a scoped amount of data/information
- Combination of AI Agenets, LLM, and MCP can provide good results with large amounts of data/information

## Model Context Protocol (MCP)

- a standardized protocol
  - implemented as a `server`, `client`
  - transport layer: defined as a system
  - can interact with natural language; and provide an answer
    - without requiring a structure
- cannot have everything in REST API (tools)
- or, AI model APIs (openai, etc.)
- separates `context` from the LLM interaction/application (SoC)

- Client
  - AI Agent can talk to MCP server
  - IDEs can use MCP servers

> create a common API/source of truth using MCPs for multiple clients wanting to consume the same type of information

- no need to create multiple agents...to perform the same operations

## MCP Pillars

1. **Resources** (data access)
   1. function: like `GET` REST endpoints
   2. purpose: load infomraiton into LLM context
2. **Tools** (Action Execution)
   1. function: like `POST` endpoints
   2. purpose: execute code or produce side effects
3. **Prompts** (interaction templates)
   1. function: reusable templates for LLM interactions
   2. purpose: define structured interaction patterns

### Resources

Provide LLM access to data sources, APIs, or other information repositories. Resources are defined with name, description, and access methods. LLM can use these resources to retrieve information, context, or other relevant data.

### Tools

Provide LLM access to perform some action with or without defined inputs; possibly NL/prompt. Tools are defined with name and description, and input requirements. LLM can use these tools to perform actions like executing code, fetching data, or interacting with external systems.

You can provide the LLM with a list of tools it can use, and it can choose which tool to invoke based on the context of the conversation or task at hand.

> A tool can be an `Agent` as well.

### Prompts

Prompts are reusable templates that define how LLM should interact with the MCP server. They can include placeholders for dynamic content, allowing for flexible and context-aware interactions. Prompts can be used to guide LLM in generating responses, asking questions, or performing specific tasks.

## MCP Inspector

The MCP Inspector is a tool that allows you to explore and interact with the MCP server. It provides a user-friendly interface to:

- View available resources, tools, and prompts
- Test interactions with the MCP server
- Debug and optimize your MCP configurations