---
applyTo: "**"
---

# Git Workflow Instructions for Copilot

## Purpose

This instruction provides comprehensive guidance for working with git in this repository, including conventional commit standards, workflow best practices, and integration with automated quality tools.

## Related Instructions

This instruction focuses on git workflow and conventional commit standards. For related topics:

- **Copilot SCP automation**: [`copilot-smart-commit-push.instructions.md`](copilot-smart-commit-push.instructions.md) - Automated commit/push workflow
- **Husky hook configuration**: [`husky-hook-management.instructions.md`](husky-hook-management.instructions.md) - Technical hook setup and troubleshooting
- **Main instruction index**: [`instructions.md`](instructions.md)

## Conventional Commit Standards

### Required Format

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description                           | Examples                                         |
| ---------- | ------------------------------------- | ------------------------------------------------ |
| `feat`     | New feature                           | `feat: add copilot testing framework`            |
| `fix`      | Bug fix                               | `fix: resolve husky pre-commit hook error`       |
| `docs`     | Documentation changes                 | `docs: update README with setup instructions`    |
| `style`    | Code style changes (formatting, etc.) | `style: fix markdown linting issues`             |
| `refactor` | Code refactoring                      | `refactor: simplify instruction file structure`  |
| `test`     | Adding or updating tests              | `test: add validation for antipattern detection` |
| `chore`    | Maintenance tasks                     | `chore: update dependencies`                     |
| `ci`       | CI/CD changes                         | `ci: add automated testing workflow`             |

### Subject Line Rules

- **Lowercase required** - commitlint enforces lowercase subjects
- **No period at end** - `feat: add feature` not `feat: add feature.`
- **Imperative mood** - `add` not `added` or `adds`
- **Maximum 72 characters** - keep it concise
- **Present tense** - describe what the commit does, not what it did

### Examples

✅ **Good commits:**

```bash
feat: complete ai pattern instruction framework
fix: resolve husky pre-commit hook configuration
docs: add comprehensive git workflow instructions
test: validate antipattern elimination in presentation
```

❌ **Bad commits:**

```bash
feat: Complete AI pattern instruction framework  # Capital letter
Fix husky error                                  # Missing type
feat: added new testing framework                # Past tense
docs: Add documentation for the new feature.    # Period at end
```

## Husky Hook Integration

This repository uses husky for automated git hook enforcement. The hooks validate commits and ensure code quality standards.

### Quick Hook Overview

- **Pre-commit**: Code validation and quality checks
- **Commit-msg**: Validates conventional commit message format

> **🔧 Detailed Configuration:** For comprehensive husky setup, configuration, and troubleshooting, see [`husky-hook-management.instructions.md`](husky-hook-management.instructions.md)

### Key Integration Points

- All commits are automatically validated against conventional commit standards
- Failed validation prevents commit completion
- Hook failures provide actionable error messages

## Git Workflow Best Practices

### Before Committing

1. **Stage changes intentionally**

   ```bash
   git add <specific-files>  # Avoid git add .
   ```

2. **Review changes**

   ```bash
   git diff --staged
   ```

3. **Test your changes**
   ```bash
   npm test  # or relevant test command
   ```

### Commit Process

1. **Write descriptive commit message**

   ```bash
   git commit -m "feat: add automated antipattern detection script"
   ```

2. **Include body for complex changes**

   ```bash
   git commit -m "feat: add automated antipattern detection script

   - implement grep-based pattern matching
   - add validation for expectation-subversion patterns
   - include comprehensive test coverage
   - provide actionable error messages"
   ```

### After Committing

1. **Push changes**

   ```bash
   git push origin <branch-name>
   ```

2. **Verify CI/CD passes** (if configured)

### Branch Management

- **Feature branches**: `feature/description` or `YYYY-MM-DD/description`
- **Bug fixes**: `fix/issue-description`
- **Documentation**: `docs/topic`
- **Keep branches focused** - one feature/fix per branch

## Repository-Specific Guidelines

### AI Pattern Instructions Context

When working with AI pattern instruction files:

1. **Test instruction compliance** before committing

   ```bash
   ./.github/scripts/test-copilot-instructions.sh
   ```

2. **Validate antipattern elimination**

   ```bash
   grep -i "isn't just\|not just\|more than just" presentation/*.md
   ```

3. **Commit instruction changes separately** from content changes

### Documentation Updates

- **Update chat logs** when adding new processes
- **Document decisions** in session logs
- **Test examples** before committing
- **Validate markdown** formatting

## Bypass Options (Emergency Use Only)

### Skip Hooks (Use Sparingly)

```bash
git commit --no-verify -m "emergency: fix critical production issue"
```

**When to use:**

- Critical production fixes
- Emergency deployments
- Hook configuration issues (like we just resolved)

**Remember to:**

- Fix the underlying issue immediately
- Re-commit properly once hooks are working
- Document why bypass was necessary

## Integration with AI Collaboration

### When Using Copilot for Commits

```ts
// copilot: generate conventional commit message for these changes
// copilot: follow conventional commit format with lowercase subject
// copilot: use appropriate commit type (feat, fix, docs, etc.)
// copilot: keep subject under 72 characters
// copilot: use imperative mood (add, fix, update)
```

### Copilot Instructions for Git Operations

```ts
// copilot: suggest appropriate commit type based on file changes
// copilot: check if commit message follows conventional commit format
// copilot: validate subject line is lowercase and under 72 characters
// copilot: recommend commit scope if appropriate
```

## Validation Checklist

Before pushing changes:

- [ ] Commit message follows conventional commit format
- [ ] Subject line is lowercase and under 72 characters
- [ ] Commit type matches the change (feat, fix, docs, etc.)
- [ ] All files are intentionally staged
- [ ] Changes have been tested
- [ ] Documentation is updated if needed
- [ ] AI instruction compliance is validated (if applicable)

## Quick Reference Commands

```bash
# Check commit message format
echo "feat: your message" | npx commitlint

# Test instruction compliance
./.github/scripts/test-copilot-instructions.sh

# Check staged changes
git diff --staged

# Conventional commit template
git commit -m "type(scope): description"

# Push with tracking
git push -u origin feature/branch-name
```

This workflow ensures consistent, high-quality commits while maintaining the AI pattern instruction framework's integrity.
