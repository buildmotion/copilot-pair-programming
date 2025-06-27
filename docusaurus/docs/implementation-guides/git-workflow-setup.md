# Git Workflow and Smart Commit Setup

## Overview

This guide provides comprehensive instructions for setting up and using an advanced git workflow with conventional commits, automated validation, and AI-assisted commit message generation.

## Git Workflow Foundation

### Conventional Commit Standards

Our repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types Reference

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add copilot testing framework` |
| `fix` | Bug fix | `fix: resolve husky pre-commit hook error` |
| `docs` | Documentation changes | `docs: update README with setup instructions` |
| `style` | Code style changes | `style: fix markdown linting issues` |
| `refactor` | Code refactoring | `refactor: simplify instruction file structure` |
| `test` | Adding or updating tests | `test: add validation for antipattern detection` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `ci` | CI/CD changes | `ci: add automated testing workflow` |

### Subject Line Rules

- ✅ **Lowercase required**: commitlint enforces lowercase subjects
- ✅ **No period at end**: `feat: add feature` not `feat: add feature.`
- ✅ **Imperative mood**: `add` not `added` or `adds`
- ✅ **Maximum 72 characters**: keep it concise
- ✅ **Present tense**: describe what the commit does, not what it did

## Automated Validation with Husky

### Pre-commit Hook Configuration

Our pre-commit hook validates code quality and instruction compliance:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# AI instruction compliance testing
if [ -f "./.github/scripts/test-copilot-instructions.sh" ]; then
    echo "Validating AI pattern instructions..."
    ./.github/scripts/test-copilot-instructions.sh
    if [ $? -ne 0 ]; then
        echo "❌ AI pattern instruction validation failed"
        exit 1
    fi
fi

# Check for antipatterns in staged files
staged_md_files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')
if [ -n "$staged_md_files" ]; then
    echo "Checking staged markdown files for antipatterns..."
    if echo "$staged_md_files" | xargs grep -l "isn't just\|not just\|more than just" 2>/dev/null; then
        echo "❌ Found expectation-subversion patterns in staged files"
        echo "Please remove antipatterns before committing"
        exit 1
    fi
fi

echo "✅ Pre-commit validation passed"
```

### Commit Message Validation

The commit-msg hook ensures conventional commit compliance:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Standard commitlint validation
npx --no-install commitlint --edit $1

# Additional AI project validation
commit_msg=$(cat $1)
if echo "$commit_msg" | grep -i "copilot\|ai pattern"; then
    echo "🤖 AI-related commit detected - validating instruction compliance"
    
    if git diff --cached --name-only | grep "\.instructions\.md$"; then
        echo "✅ Instruction file changes detected"
    fi
fi
```

## Smart Commit and Push (SCP) Workflow

### Overview

The SCP workflow is a fully automated process using GitHub Copilot for intelligent commit message generation and pushing changes.

### Usage

Simply type **`cp scp`** in GitHub Copilot chat to trigger the workflow.

### What SCP Does

1. **Analyzes Changes**: Reviews git diff and file modifications
2. **Generates Message**: Creates comprehensive conventional commit message
3. **Stages Files**: Automatically stages all changes
4. **Commits**: Applies the generated commit message
5. **Pushes**: Pushes changes to the remote repository

### Example SCP Workflow

#### Input (via Copilot chat):
```
cp scp
```

#### SCP Analysis:
- Scans modified files: `presentation/comprehensive-talk-outline.md`, `.github/instructions/style-management.instructions.md`
- Analyzes changes: Content improvements, style guide updates
- Determines commit type: `feat` (new functionality added)

#### Generated Commit:
```bash
git add . && git commit -m "feat(presentation): enhance talk outline with advanced copilot techniques

- Added comprehensive section on custom instructions and prompt engineering
- Integrated real-world use cases and enterprise adoption examples  
- Updated style management instructions for better AI collaboration
- Improved presenter notes with timing and audience interaction guidance

This update transforms the basic Copilot overview into a comprehensive
masterclass covering beginner to advanced techniques with practical
takeaways for immediate implementation." && git push
```

### SCP Benefits

- **Consistency**: Ensures all commits follow conventional standards
- **Comprehensiveness**: Generates detailed commit messages with context
- **Efficiency**: Single command handles entire commit-push workflow
- **Intelligence**: AI understands change context and generates appropriate descriptions

## Setup Instructions

### 1. Install Dependencies

```bash
# Install husky for git hooks
npm install --save-dev husky

# Install commitlint for message validation
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Initialize husky
npx husky install
npm pkg set scripts.prepare="husky install"
```

### 2. Configure Commitlint

Create `.commitlintrc.json`:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 72],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix", 
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "ci"
      ]
    ]
  }
}
```

### 3. Create Git Hooks

```bash
# Create pre-commit hook
npx husky add .husky/pre-commit "echo 'Running pre-commit checks...' && ./.github/scripts/test-copilot-instructions.sh"

# Create commit-msg hook  
npx husky add .husky/commit-msg "npx commitlint --edit \$1"

# Make hooks executable
chmod +x .husky/pre-commit .husky/commit-msg
```

### 4. Install GitHub Copilot

1. Install GitHub Copilot extension in VS Code
2. Sign in with GitHub account
3. Verify access to chat functionality

## Daily Workflow

### Standard Development Flow

1. **Make Changes**: Edit files, add features, fix bugs
2. **Review Changes**: `git diff` to verify modifications
3. **Use SCP**: Type `cp scp` in Copilot chat
4. **Verify Results**: Check git log for proper commit message

### Manual Commit Alternative

If not using SCP, follow this pattern:

```bash
# Stage specific files
git add src/components/NewFeature.tsx

# Write conventional commit
git commit -m "feat(components): add user profile management component

- Implement user profile viewing and editing functionality
- Add form validation with real-time feedback
- Include avatar upload with image optimization
- Integrate with authentication system for security

Component supports both view and edit modes with smooth transitions
and comprehensive error handling for all user scenarios."

# Push changes
git push origin feature/user-profile
```

## Advanced Techniques

### Commit Message Templates

For complex changes, use this template structure:

```
<type>(<scope>): <concise description>

<detailed explanation of what and why>:
- <specific change 1>
- <specific change 2>  
- <specific change 3>

<additional context about implementation decisions>
<breaking changes or migration notes if applicable>

<footer references to issues, PRs, or related work>
```

### Branch Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/api-integration

# Bug fix branches  
fix/login-validation-error
fix/memory-leak-component

# Documentation branches
docs/api-reference-update
docs/setup-instructions

# Dated branches for experiments
2025-06-26/copilot-workflow-experiment
```

### Multi-step Complex Changes

For large changes across multiple commits:

```bash
# Step 1: Infrastructure
git commit -m "feat(core): add user management infrastructure"

# Step 2: Implementation  
git commit -m "feat(auth): implement authentication system"

# Step 3: Integration
git commit -m "feat(ui): integrate auth with user interface"

# Step 4: Testing
git commit -m "test(auth): add comprehensive authentication tests"

# Step 5: Documentation
git commit -m "docs(auth): add authentication setup guide"
```

## Troubleshooting

### Common Hook Issues

#### Hook Permission Problems
```bash
# Fix hook permissions
chmod +x .husky/pre-commit .husky/commit-msg

# Verify hook files exist
ls -la .husky/
```

#### Commitlint Failures
```bash
# Test commit message format
echo "feat: test message" | npx commitlint

# Bypass hooks for emergency fixes (use sparingly)
git commit --no-verify -m "emergency: fix critical production issue"
```

#### SCP Not Working
- Ensure GitHub Copilot has chat access
- Try explicit command: "Please run smart commit and push workflow"
- Verify git repository status with `git status`

### Best Practices

- **Test hooks before relying on them**: Run `.husky/pre-commit` manually
- **Keep commits atomic**: One logical change per commit
- **Write descriptive bodies**: Explain the "why" alongside the "what"
- **Reference related work**: Link to issues, PRs, or documentation
- **Review before pushing**: Double-check commit messages and file changes

This workflow provides a robust foundation for high-quality git management with AI assistance while maintaining strict standards for commit quality and project organization.
