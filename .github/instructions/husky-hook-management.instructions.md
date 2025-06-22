---
applyTo: "**"
---

# Husky Hook Management Instructions for Copilot

## Purpose

This instruction provides specific guidance for configuring, maintaining, and troubleshooting husky git hooks in development environments, particularly for repositories with AI pattern instructions and code quality enforcement.

## Related Instructions

This instruction focuses specifically on husky technical configuration and troubleshooting. For related topics:

- **Git workflow and conventional commits**: [`git-workflow.instructions.md`](git-workflow.instructions.md) - Overall git best practices
- **Copilot SCP automation**: [`scp.md`](scp.md) - Automated commit/push workflow
- **Main instruction index**: [`instructions.md`](instructions.md)

## Hook Configuration Best Practices

### Pre-commit Hook Structure

**Correct pattern:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Pre-commit validation steps
echo "🔍 Running pre-commit checks..."

# Example checks (customize as needed):
# npm run lint
# npm run test
# ./test-copilot-instructions.sh

echo "✅ Pre-commit validation passed"
```

**What NOT to do:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# ❌ WRONG: commitlint belongs in commit-msg hook
npx commitlint --edit $1  # This causes the error we just fixed
```

### Commit-msg Hook Structure

**Correct pattern:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate commit message format
npx --no-install commitlint --edit $1
```

### Hook Responsibilities Matrix

| Hook          | Purpose                       | Gets Parameters          | Common Tasks                    |
| ------------- | ----------------------------- | ------------------------ | ------------------------------- |
| `pre-commit`  | Code validation before commit | None                     | Linting, testing, formatting    |
| `commit-msg`  | Message validation            | Message file path (`$1`) | Conventional commit enforcement |
| `pre-push`    | Validation before push        | Branch info              | CI checks, integration tests    |
| `post-commit` | Actions after commit          | None                     | Notifications, cleanup          |

## Installation and Setup

### Initial Setup

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky install

# Set up package.json script
npm pkg set scripts.prepare="husky install"
```

### Creating Hooks

```bash
# Create pre-commit hook
npx husky add .husky/pre-commit "echo 'Pre-commit checks'"

# Create commit-msg hook
npx husky add .husky/commit-msg "npx commitlint --edit \$1"

# Make hooks executable
chmod +x .husky/*
```

## Troubleshooting Common Issues

### Issue 1: "commitlint --edit requires a message file path"

**Symptoms:**

- Git commit fails with parameter error
- Husky hooks show debugger messages
- Commitlint complains about missing file

**Root Cause:**
Pre-commit hook incorrectly running commitlint with `--edit $1`

**Solution:**

```bash
# Fix pre-commit hook - remove commitlint
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Pre-commit checks (NO commitlint here)
echo "Running pre-commit checks..."
echo "✅ Pre-commit validation passed"
EOF

# Ensure commit-msg hook has commitlint
cat > .husky/commit-msg << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
EOF
```

### Issue 2: "Husky hooks not executing"

**Diagnosis steps:**

```bash
# Check if hooks exist
ls -la .husky/

# Check if hooks are executable
ls -la .husky/pre-commit .husky/commit-msg

# Verify husky installation
npm ls husky

# Check git config
git config core.hooksPath
```

**Solutions:**

```bash
# Reinstall husky
rm -rf .husky
npx husky install

# Fix permissions
chmod +x .husky/*

# Reset git hooks path
git config core.hooksPath .husky
```

### Issue 3: "DEPRECATED warnings"

**Symptoms:**

```
husky - DEPRECATED
Please remove the following two lines from .husky/pre-commit:
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
```

**Solution:**

```bash
# Update hook format (remove env and -- from dirname)
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
```

## Integration with AI Pattern Instructions

### Pre-commit Validation for AI Instructions

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running AI pattern instruction validation..."

# Test instruction compliance
if [ -f "./test-copilot-instructions.sh" ]; then
    ./test-copilot-instructions.sh
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

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Standard commitlint validation
npx --no-install commitlint --edit $1

# Additional AI project validation
commit_msg=$(cat $1)
if echo "$commit_msg" | grep -i "copilot\|ai pattern"; then
    echo "🤖 AI-related commit detected - validating instruction compliance"

    # Check if instruction files are properly formatted
    if git diff --cached --name-only | grep "\.instructions\.md$"; then
        echo "✅ Instruction file changes detected"
    fi
fi
```

## Hook Development Guidelines

### Adding New Validation Steps

1. **Keep hooks fast** - avoid long-running operations
2. **Provide clear feedback** - use emojis and descriptive messages
3. **Exit with proper codes** - 0 for success, non-zero for failure
4. **Test hook changes** - validate before committing hook modifications

### Example: Adding Linting to Pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Lint staged files
if command -v npx >/dev/null 2>&1; then
    echo "Running ESLint on staged files..."
    npx lint-staged
fi

# Test AI instruction compliance
if [ -f "./test-copilot-instructions.sh" ]; then
    echo "Validating AI pattern instructions..."
    ./test-copilot-instructions.sh
fi

echo "✅ Pre-commit validation passed"
```

## Emergency Procedures

### Temporarily Disable Hooks

```bash
# Skip all hooks for one commit (emergency only)
git commit --no-verify -m "emergency: bypass hooks for critical fix"

# Disable specific hook temporarily
mv .husky/pre-commit .husky/pre-commit.disabled
```

### Fix Broken Hook Configuration

```bash
# Backup current hooks
cp -r .husky .husky.backup

# Reset to minimal working state
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
echo "✅ Pre-commit passed"
EOF

cat > .husky/commit-msg << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx --no-install commitlint --edit $1
EOF

chmod +x .husky/*
```

## Integration with Copilot Instructions

### Copilot Directives for Hook Management

```ts
// copilot: when creating git hooks, separate concerns between pre-commit and commit-msg
// copilot: pre-commit hooks should validate code, not commit messages
// copilot: commit-msg hooks should validate message format using commitlint
// copilot: always make hooks executable with chmod +x
// copilot: use proper shell script format with #!/bin/sh
// copilot: include error handling and clear success/failure messages
```

### Hook Testing Commands

```bash
# Test pre-commit hook manually
./.husky/pre-commit

# Test commit-msg hook manually
echo "feat: test message" > /tmp/test-commit-msg
./.husky/commit-msg /tmp/test-commit-msg

# Test commitlint directly
echo "feat: test message" | npx commitlint

# Validate hook permissions
ls -la .husky/ | grep -E "(pre-commit|commit-msg)"
```

This comprehensive hook management ensures reliable git workflows while maintaining AI pattern instruction compliance.
