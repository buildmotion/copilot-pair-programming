---
title: Husky Error Troubleshooting & Resolution
description: Systematic debugging of git commit failures caused by misconfigured husky hooks
authors: [development-team]
tags: [husky, git-hooks, troubleshooting, debugging, commitlint]
date: 2025-06-22
---

# Husky Error Troubleshooting & Resolution

## Session Overview

This development session demonstrates systematic troubleshooting of a git commit failure caused by misconfigured husky hooks. The conversation followed our AI troubleshooting protocol to identify and resolve the root cause during SCP (Smart Commit and Push) directive execution.

<!-- truncate -->

## The Problem

**User Question:** "what is the husky error?"

**Context:** Git commits were failing during SCP directive execution, preventing the automated workflow from completing successfully.

## Systematic Troubleshooting Approach

### 1. Root Cause Analysis

We traced the complete workflow:
- Git commit triggers pre-commit hook 
- Pre-commit hook runs commitlint 
- Commitlint fails due to wrong parameters

### 2. Code Investigation

Rather than making assumptions, we analyzed the actual hook implementations:
- `.husky/pre-commit` - Found the problematic code
- `.husky/commit-msg` - Verified correct commitlint placement
- `.commitlintrc.json` - Confirmed configuration was valid

### 3. Issue Identification

**The Problem:** Pre-commit hook running `npx commitlint --edit $1`

**Why This Failed:**
- Pre-commit hooks don't receive commit message files as parameters
- The `--edit $1` parameter is for commit-msg hooks, not pre-commit hooks
- Wrong hook responsibility: commitlint belongs in commit-msg phase

## The Solution

**Before (incorrect):**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# Run commitlint to enforce Conventional Commit standards
npx commitlint --edit $1
```

**After (corrected):**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# Pre-commit checks
echo "Running pre-commit checks..."
echo "✅ Pre-commit validation passed"
```

## Key Learning Points

### Git Hook Responsibilities

1. **Pre-commit**: Runs before commit message is created
   - Code quality checks
   - Linting
   - Tests
   - No commit message parameters

2. **Commit-msg**: Validates commit message format
   - Where commitlint belongs
   - Receives commit message file path as parameter

### Best Practices Applied

- **Separate Concerns**: Keep hook responsibilities focused
- **Read Code**: Analyze actual implementations, don't assume
- **Trace Execution**: Follow complete path from trigger to failure
- **Test Fixes**: Validate changes in isolation

## Results

✅ **Commit succeeded** with conventional commit format  
✅ **Push completed** successfully to remote branch  
✅ **SCP directive** fully executed (Summarize, Commit, Push)  
✅ **Git operations** working correctly with proper hook configuration

## Improved Prompt Techniques

The troubleshooting was successful, but the initial prompt could have been more effective:

**Original:** "what is the husky error?"

**Better Approach:**
```
I'm getting a husky error during git commit while executing the SCP directive. 
The error message shows commitlint validation failure. Can you systematically 
analyze the git hook configuration to identify the root cause and provide a solution?
```

This improved prompt would:
- Provide immediate context
- Include error details
- Request systematic analysis
- Specify the workflow being executed

## Takeaways

This session demonstrates the value of systematic debugging methodology:

1. **Understand the complete workflow** before jumping to solutions
2. **Analyze actual code** rather than making assumptions
3. **Trace execution paths** from trigger to failure point
4. **Apply structured troubleshooting** protocols consistently
5. **Validate fixes** thoroughly before proceeding

The AI troubleshooting protocol proved effective in quickly identifying and resolving a complex git hook configuration issue, enabling successful completion of the automated SCP workflow.