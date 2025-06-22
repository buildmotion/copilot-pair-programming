# Nx Workspace Setup Guide

This document provides a comprehensive guide on creating and configuring an Nx workspace for your projects.

## What is Nx?

Nx is a build system with built-in tooling and advanced CI capabilities. It helps developers build, test, and deploy multiple applications from a single codebase, making monorepo management efficient and scalable.

## Prerequisites

- Node.js v18 or later
- npm v8 or later (or yarn/pnpm)
- Git (for version control)

## Creating a New Nx Workspace

There are multiple ways to create a new Nx workspace:

### Method 1: Using npx (Recommended)

```bash
npx create-nx-workspace@latest my-workspace

 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

✔ Which stack do you want to use? · none
✔ Would you like to use Prettier for code formatting? · Yes
✔ Which CI provider would you like to use? · github

 NX   Creating your v21.2.1 workspace.

⠋ Installing dependencies with npmDebugger listening on ws://127.0.0.1:51523/783c7bf9-7706-443e-a35a-429a0a03ff75
For help, see: <https://nodejs.org/en/docs/inspector>
Debugger attached.
Waiting for the debugger to disconnect...
✔ Installing dependencies with npm
✔ Successfully created the workspace: workspace.
✔ Nx Cloud has been set up successfully
✔ CI workflow has been generated successfully

 NX   Directory is already under version control. Skipping initialization of git.

Debugger listening on ws://127.0.0.1:51658/3254b937-9b3b-40af-b0c4-29951afdfb45
For help, see: <https://nodejs.org/en/docs/inspector>
Debugger attached.
Waiting for the debugger to disconnect...
Debugger listening on ws://127.0.0.1:51660/ff5cb69d-7b18-4f7b-9d28-f89266d6ec83
For help, see: <https://nodejs.org/en/docs/inspector>
Debugger attached.
Waiting for the debugger to disconnect...

 NX   Your CI setup is almost complete.

Finish it by visiting: <https://cloud.nx.app/connect/MYGFbP4YVR>

 NX   Welcome to the Nx community! 👋

🌟 Star Nx on GitHub: <https://github.com/nrwl/nx>
📢 Stay up to date on X: <https://x.com/nxdevtools>
💬 Discuss Nx on Discord: <https://go.nx.dev/community>
```

During the setup process, you'll be asked to configure your workspace:

### Interactive Prompts

When you run the command, you'll be prompted to make several choices:

1. **Stack Selection**:

   ```bash
   ✔ Which stack do you want to use? · none
   ```

   Options include:
   - `none` - Empty workspace with no pre-configured settings
   - `react` - React applications
   - `angular` - Angular applications
   - `next.js` - Next.js applications
   - And many others depending on your needs

2. **Code Formatting**:

   ```bash
   ✔ Would you like to use Prettier for code formatting? · Yes
   ```

   - Recommended to choose `Yes` for consistent code formatting

3. **CI Provider**:

   ```bash
   ✔ Which CI provider would you like to use? · github
   ```

   Options include:
   - `github` - GitHub Actions
   - `circleci` - CircleCI
   - `azure` - Azure DevOps
   - `gitlab` - GitLab CI
   - `none` - No CI configuration

Nx will then create your workspace with the specified configuration.

### Example Output

```bash
 NX   Creating your v21.2.1 workspace.

✔ Installing dependencies with npm
✔ Successfully created the workspace: my-workspace.
✔ Nx Cloud has been set up successfully
✔ CI workflow has been generated successfully
```

## Method 2: Using Nx CLI (If Already Installed)

If you already have the Nx CLI installed globally, you can use:

```bash
nx create-workspace my-workspace
```

## Method 3: Using Package Managers Directly

### Using npm

```bash
npm init nx-workspace my-workspace
```

### Using Yarn

```bash
yarn create nx-workspace my-workspace
```

## Nx Workspace Structure

After creation, your workspace will have the following structure:

```text
my-workspace/
├── apps/                   # Application projects
├── libs/                   # Library projects (shared code)
├── tools/                  # Workspace-specific tooling
├── nx.json                 # Nx configuration
├── package.json            # Workspace dependencies
└── tsconfig.base.json      # Base TypeScript configuration
```

## Connecting to Nx Cloud

Nx Cloud provides distributed caching and task execution to speed up your builds:

```bash
 NX   Your CI setup is almost complete.

Finish it by visiting: https://cloud.nx.app/connect/[YOUR-UNIQUE-LINK]
```

Visit the provided link to connect your workspace to Nx Cloud for enhanced features.

## Adding Projects to Your Workspace

Once your workspace is set up, you can add projects using generators:

```bash
nx generate application my-app
# or
nx g app my-app
```

## Working with Your Nx Workspace

### Running Tasks

```bash
# Run a target for a specific project
nx build my-app

# Run a target for all projects
nx run-many --target=build --all
```

### Visualizing Your Workspace

```bash
# Generate a visualization of project dependencies
nx graph
```

## Enabling Nx Tools for GitHub Copilot

GitHub Copilot can be enhanced with Nx-specific intelligence using the Model Context Protocol (MCP). Here's how to set it up:

### 1. Install VS Code Extensions

Install the Nx Console extension for VS Code:

```bash
code --install-extension nrwl.angular-console
```

### 2. Configure VS Code Settings

Create or update your `.vscode/settings.json` file:

```json
{
  "nx.enableCopilotTools": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true
}
```

### 3. Create GitHub Copilot Instructions

Add Nx-specific instructions for GitHub Copilot by creating a file at `.github/copilot/instructions.md`:

```markdown
---
applyTo: '**'
---

# Nx Workspace Assistance

You are in an Nx workspace using Nx [VERSION] with [PACKAGE_MANAGER] as the package manager.

## Using Nx Tools

When helping with Nx-related questions:

- Use `nx_workspace` to understand the workspace architecture
- Use `nx_docs` for configuration and best practices
- Use `nx_visualize_graph` to show project dependencies
- Use `nx_generators` to list available generators

## Generator Guidelines

When generating code:

1. Learn about the workspace with `nx_workspace` and `nx_project_details`
2. Find generators with `nx_generators`
3. Get generator details with `nx_generator_schema`
4. Open the generator UI with `nx_open_generate_ui`
5. Read logs with `nx_read_generator_log`
```

Replace `[VERSION]` with your Nx version and `[PACKAGE_MANAGER]` with your package manager (npm, yarn, or pnpm).

### 4. Verify Configuration

After setting everything up, you can verify the MCP integration by:

1. Opening a file in your Nx workspace
2. Opening GitHub Copilot Chat
3. Asking an Nx-specific question like "What projects are in this workspace?"

The Copilot response should show it's using Nx tools to answer your question.

## Git Integration for Nx Workspace

When working with Nx in a team environment, it's recommended to create feature branches for your work:

```bash
# Create and switch to a new dated feature branch
git checkout -b YYYYMMDD/feature-name

# Example
git checkout -b 20250622/nx-setup
```

This naming convention helps organize branches by date and feature.

## Additional Resources

- [Nx Documentation](https://nx.dev/getting-started/intro)
- [Nx GitHub Repository](https://github.com/nrwl/nx)
- [Nx Community Discord](https://go.nx.dev/community)
