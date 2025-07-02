# Smart Commit and Push (SCP) Workflow

## Overview

The `cp scp` workflow is a fully automated process for committing and pushing changes to a Git repository using GitHub Copilot. It adheres to Single Responsibility (SR) and Separation of Concerns (SoC) principles, using conventional commit standards.

## How to Use

Simply type **"`cp scp`"** in the chat with GitHub Copilot. This is a direct command to Copilot that triggers the `cp scp` workflow.

**Alternative**: You can also use the detailed prompt template directly with `#prompt commit-and-push.prompt.md` for more explicit control over the execution steps.

Copilot will:

1. Generate a single command line that performs all the necessary Git operations
2. Execute this command automatically  
3. Report the results back to you

## Workflow Steps (Performed by Copilot)

### 1. Stage Changes
Automatically stage all changes using `git add .`

### 2. Analyze Changes  
Examine the changes to determine the most appropriate commit type and summary

### 3. Commit Changes
Create a conventional commit message based on the analysis, including:
- A properly formatted commit header with type, scope, and description
- Any necessary footers (breaking changes, etc.)

### 4. Push Changes
Push the commit to the remote repository

## Key Features

### Direct Copilot Automation
The process is performed entirely by the Copilot Agent using a single command line

### Conventional Commit Compliance
All commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Intelligent Change Analysis
Copilot analyzes the changes to determine:
- **Commit Type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Scope**: The area of codebase affected
- **Description**: Clear, concise summary of changes

## Supported Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add user login functionality` |
| `fix` | Bug fix | `fix(api): resolve timeout issue in user service` |
| `docs` | Documentation changes | `docs(readme): update installation instructions` |
| `style` | Code style changes | `style(components): fix linting issues` |
| `refactor` | Code refactoring | `refactor(utils): simplify helper functions` |
| `test` | Adding or updating tests | `test(auth): add unit tests for login service` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `ci` | CI/CD changes | `ci(github): add automated testing workflow` |

## Integration with Git Hooks

The SCP workflow integrates seamlessly with Husky pre-commit hooks:

### Pre-commit Validation
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit validation..."

# AI instruction compliance testing
if [ -f "./test-copilot-instructions.sh" ]; then
    ./test-copilot-instructions.sh
fi

# Antipattern detection
staged_md_files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$' || true)
# ... validation logic
```

### Commit Message Validation  
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate conventional commit format
npx commitlint --edit $1
```

## Advanced Usage

### Custom Scopes
The SCP workflow can determine appropriate scopes based on file changes:

- `frontend/` changes → `feat(ui): ...`
- `backend/` changes → `feat(api): ...`  
- `docs/` changes → `docs(guide): ...`
- `test/` changes → `test(unit): ...`

### Multi-file Analysis
Copilot analyzes all staged changes collectively to create a single, coherent commit message that encompasses the entire changeset.

### Breaking Changes
When breaking changes are detected, the workflow automatically:
- Adds `!` to the commit type: `feat!: ...`
- Includes `BREAKING CHANGE:` footer with details
- Ensures proper semantic versioning impact

## Error Handling

### Pre-commit Hook Failures
If pre-commit hooks fail, the SCP workflow:
1. Reports the specific validation error
2. Provides guidance on how to fix the issue
3. Aborts the commit to prevent quality issues

### Network Issues
If push fails due to network issues:
1. Commit is preserved locally
2. Error details are reported
3. Retry guidance is provided

### Merge Conflicts
If push fails due to remote changes:
1. Suggests pulling latest changes first
2. Provides conflict resolution guidance
3. Preserves local commit for after resolution

## Best Practices

### When to Use SCP
- ✅ **Small, focused changes** that can be summarized easily
- ✅ **Single-purpose commits** following SRP principles
- ✅ **Standard development workflow** additions/fixes
- ✅ **Documentation updates** with clear scope

### When to Use Manual Commits
- ❌ **Complex, multi-purpose changes** requiring detailed explanation
- ❌ **Breaking changes** that need careful documentation
- ❌ **Sensitive changes** requiring manual review
- ❌ **Experimental features** that might be reverted

### Quality Assurance
The SCP workflow includes multiple quality gates:

1. **Pre-commit hooks** validate code quality
2. **Conventional commit** format enforcement
3. **AI instruction compliance** testing
4. **Antipattern detection** in content files

## Troubleshooting

### Common Issues

#### "cp scp" Not Recognized
**Problem**: Copilot doesn't respond to the `cp scp` command

**Solutions**:
- Ensure the instruction file is properly loaded
- Try the explicit prompt: `#prompt commit-and-push.prompt.md`
- Verify file context includes the instruction directory

#### Commit Message Too Generic
**Problem**: Generated commit messages lack specificity

**Solutions**:
- Make smaller, more focused changes
- Add comments explaining the purpose of changes
- Use descriptive file and function names

#### Pre-commit Hook Failures
**Problem**: Hooks prevent commit completion

**Solutions**:
- Review the specific validation error
- Fix the reported issues (linting, antipatterns, etc.)
- Ensure all tests pass before committing

## Related Instructions

- **Git workflow and conventional commits**: [Git Workflow Instructions](../implementation-guides/git-workflow-setup)
- **Husky hook configuration**: [Implementation Guides](../implementation-guides/git-workflow-setup)
- **Style management**: [Style Management System](./style-management)
- **AI troubleshooting**: [AI Instructions Framework](./framework-overview)

## Examples

### Simple Feature Addition
**Input**: `cp scp` (after adding a new component)

**Output**: 
```bash
git add . && git commit -m "feat(components): add user profile card component" && git push
```

### Bug Fix
**Input**: `cp scp` (after fixing a validation issue)

**Output**:
```bash
git add . && git commit -m "fix(validation): resolve email format validation error" && git push
```

### Documentation Update
**Input**: `cp scp` (after updating README)

**Output**:
```bash
git add . && git commit -m "docs(readme): update installation and setup instructions" && git push
```

The SCP workflow represents a significant productivity enhancement, automating the routine but important task of creating consistent, well-formatted commits while maintaining code quality through automated validation.