# Smart Commit & Push Prompt

## Overview
Automated git workflow for staging, committing with conventional format, and pushing changes.

## Instructions for Copilot

When user types "cp scp" or requests commit and push:

1. **Stage all changes**
   ```bash
   git add .
   ```

2. **Analyze changes** using `git status --porcelain` and `git diff --staged`

3. **Generate comprehensive conventional commit message**:
   - **Format**: 
     ```
     type(scope): subject line (max 72 chars)
     
     Body paragraph explaining what and why:
     - What was changed (bullet points for clarity)
     - Why the change was made
     - Any important implementation details
     - Impact on existing functionality
     
     [optional breaking changes footer]
     [optional references footer]
     ```
   - **Subject line**: lowercase, imperative mood, max 72 characters, no period
   - **Body requirements**:
     - Explain the **what** and **why** thoroughly
     - Use bullet points for multiple changes
     - Include context for future developers
     - Mention any breaking changes or migration notes
     - Reference related issues, PRs, or documentation
   - **Types**: feat, fix, docs, style, refactor, test, chore, ci
   - **Scope**: optional, use file/module context when relevant

4. **Commit with comprehensive message**:
   ```bash
   git commit -m "type(scope): subject line

   Body paragraph explaining what and why:
   - What was changed (bullet points for clarity)
   - Why the change was made
   - Implementation details and impact
   
   [optional footers]" && git push
   ```

5. **Report results** with commit hash and push confirmation

## Conventional Commit Examples

### Simple Change
```
feat: add automated commit workflow

Implement smart commit and push functionality using GitHub Copilot.
- Analyze git diffs to determine appropriate commit type
- Generate conventional commit messages automatically
- Stage all changes and push to current branch

This streamlines the development workflow and ensures consistent
commit message formatting across the project.
```

### Bug Fix with Context
```
fix(auth): resolve token validation error

Fix JWT token expiration handling in authentication middleware.
- Update token refresh logic to handle edge cases
- Add proper error handling for expired tokens
- Improve user experience during session timeouts

Resolves issue where users were logged out unexpectedly during
active sessions. The fix ensures seamless token renewal without
interrupting user workflows.

Fixes #123
```

### Breaking Change
```
feat(api)!: migrate to new authentication system

Replace legacy auth with OAuth2 implementation.
- Remove deprecated session-based authentication
- Implement OAuth2 with JWT tokens
- Update all API endpoints to use new auth headers
- Add migration guide for existing users

BREAKING CHANGE: All API clients must update to use OAuth2 tokens
instead of session cookies. See MIGRATION.md for upgrade steps.

Refs #456, #789
```

### Documentation Update
```
docs: update setup instructions

Improve onboarding experience with clearer setup steps.
- Add prerequisites section with required tools
- Include troubleshooting guide for common issues
- Add examples for different development environments
- Update screenshots to reflect current UI

This addresses feedback from new team members who struggled
with the initial setup process.
```

## Change Analysis Guidelines

Before generating the commit message, analyze:

### File Changes
- **What files were modified?** (determine scope)
- **What type of changes?** (new features, bug fixes, refactoring)
- **How extensive are the changes?** (single file vs. multiple modules)

### Content Analysis
- **Functional changes**: New features, modified behavior, bug fixes
- **Non-functional changes**: Performance, security, maintainability
- **Documentation changes**: README, comments, guides
- **Configuration changes**: Settings, dependencies, build files

### Impact Assessment
- **Who is affected?** (developers, users, systems)
- **What breaks?** (breaking changes, deprecations)
- **What improves?** (performance, UX, developer experience)
- **Dependencies**: Related changes, prerequisites, follow-ups

### Context Gathering
- **Why was this needed?** (problem being solved)
- **How does it work?** (key implementation details)
- **What alternatives were considered?** (if significant)
- **Future implications**: Migration needs, deprecation timelines

## Error Handling

- **Merge conflicts**: Stop and report conflict files for manual resolution
- **No changes**: Report "no changes to commit"
- **Push failures**: Report error and suggest pull/rebase
- **Permission issues**: Report authentication/access problems

## Validation

After execution, confirm:
- Commit created with proper conventional format
- Changes pushed to remote repository
- No errors in git operations

## Security Notes

- Never commit sensitive data (API keys, passwords, secrets)
- Respect .gitignore patterns
- Generate descriptive but safe commit messages
- Avoid including personal information in commit messages
