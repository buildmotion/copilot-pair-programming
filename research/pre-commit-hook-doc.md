# Pre-Commit Hook for Conventional Commit Compliance

## Overview

This document provides a comprehensive guide to the pre-commit hook feature installed and configured in this repository. The pre-commit hook ensures that all commit messages adhere to the Conventional Commit standard, improving consistency and readability in the project's commit history.

## Tools and Packages Used

1. **Husky**: A tool for managing Git hooks.
2. **Commitlint**: A linter for commit messages to enforce Conventional Commit standards.

## Installation Process

### Step 1: Install Dependencies

Run the following command to install Husky and Commitlint:

```bash
yarn add -D @commitlint/config-conventional @commitlint/cli husky
```

### Step 2: Configure Commitlint

Create a `.commitlintrc.json` file in the root of the repository with the following content:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

This configuration ensures that Commitlint uses the Conventional Commit rules.

### Step 3: Initialize Husky

Run the following command to initialize Husky:

```bash
yarn husky install
```

This sets up Husky to manage Git hooks in the repository.

### Step 4: Add the `commit-msg` Hook

Create a `commit-msg` hook to validate commit messages using Commitlint. Run the following command:

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

Alternatively, manually create the `.husky/commit-msg` file with the following content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

Ensure the file is executable by running:

```bash
chmod +x .husky/commit-msg
```

## How It Works

1. **Commitlint**: Validates the commit message against the Conventional Commit standard.
2. **Husky**: Executes the `commit-msg` hook before the commit is finalized.
3. **Validation**: If the commit message does not comply, the commit is rejected with an error message.

## Example Workflow

### Valid Commit Message

```plaintext
feat(logging): add new logging protocol
```

### Invalid Commit Message

```plaintext
update logging
```

Commitlint will reject the invalid message and provide feedback:

```plaintext
⧗   input: update logging
✖   subject may not be empty [subject-empty]
✖   found 1 problems, 0 warnings
```

## Troubleshooting

### Common Issues

1. **Husky Not Installed**: Ensure Husky is installed by running `yarn husky install`.
2. **Commitlint Errors**: Verify the `.commitlintrc.json` file is correctly configured.
3. **Permission Issues**: Ensure the `.husky/commit-msg` file is executable.

### Debugging

Run the following command to test the hook:

```bash
npx commitlint --from HEAD~1 --to HEAD
```

This validates the last commit message.

## Benefits

- Enforces consistent commit message formatting.
- Improves collaboration and readability.
- Integrates seamlessly with Git workflows.

## References

- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitlint Documentation](https://commitlint.js.org/#/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
