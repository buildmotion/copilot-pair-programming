---
applyTo: "**"
---

# Enhanced AI Assistant Instructions for Code Troubleshooting

## Quick Reference

### Protocol Steps

1. **Understand the Workflow**: Trace the complete code path.
2. **Analyze Code Thoroughly**: Verify all implementations.
3. **Identify Root Cause**: Compare expected vs. actual behavior.
4. **Add Logging**: Include diagnostic logs at key points.
5. **Manage State**: Ensure proper session and cache handling.
6. **Audit File Operations**: Verify file creation and access.
7. **Report Issues**: Provide detailed reproduction steps.
8. **Validate Fixes**: Test edge cases and confirm functionality.

---

## CRITICAL: Systematic Code Analysis Protocol

When debugging or troubleshooting code issues, ALWAYS follow this protocol:

### 1. UNDERSTAND THE COMPLETE WORKFLOW FIRST

**Before making ANY changes, trace the complete code path:**

```
REQUIRED ANALYSIS STEPS:
1. Identify the entry points (user actions, events, activations)
2. Map the complete execution flow from start to finish
3. Identify all state changes, caching, and persistence
4. Note all async operations and their dependencies
5. Document where data is created, stored, and retrieved
```

**Example Questions to Answer:**

- What triggers this functionality?
- What is the complete call stack?
- Where is state/data cached or persisted?
- What happens on initialization vs. runtime?
- Are there race conditions or timing issues?

### 2. READ AND ANALYZE EXISTING CODE THOROUGHLY

**NEVER assume - always verify by reading the actual implementation:**

```
VERIFICATION CHECKLIST:
□ Read the actual method implementations
□ Check constructor initialization
□ Verify caching/persistence logic
□ Identify all places where data is read/written
□ Look for timestamp or dynamic value generation
□ Check error handling and fallback paths
```

### 3. IDENTIFY THE ROOT CAUSE SYSTEMATICALLY

**Use evidence-based diagnosis:**

```
ROOT CAUSE ANALYSIS:
1. Compare expected vs. actual behavior
2. Identify where the divergence occurs
3. Check for timing issues (timestamps, async operations)
4. Verify state management (caching, persistence)
5. Look for inconsistent data handling
```

### 4. LOGGING AND DEBUGGING GUIDANCE

**Always include comprehensive logging in troubleshooting:**

```typescript
// REQUIRED: Add diagnostic logging at key points
console.log("🔍 [DEBUG] Method entry:", { param1, param2 });
console.log("🔍 [DEBUG] State before:", this.currentState);
console.log("🔍 [DEBUG] Operation result:", result);
console.log("🔍 [DEBUG] State after:", this.currentState);
```

**Key logging points:**

- Method entry/exit with parameters
- State changes (before/after)
- Cache hits/misses
- File operations (read/write/create)
- Error conditions and fallbacks

### 5. SESSION AND STATE MANAGEMENT PATTERNS

**For extensions and persistent applications:**

```
SESSION MANAGEMENT CHECKLIST:
□ When is state initialized?
□ How is state persisted between sessions?
□ What triggers state reset/refresh?
□ Are there multiple sources of truth?
□ How is cache invalidation handled?
```

### 6. FILE AND RESOURCE MANAGEMENT

**For file-based operations:**

```
FILE OPERATIONS AUDIT:
□ When are files created vs. accessed?
□ How are file paths generated and cached?
□ Are there timestamp-based naming conflicts?
□ What happens on concurrent access?
□ How are directory permissions handled?
```

### 7. ERROR REPORTING STANDARDS

**When reporting issues or providing solutions:**

```
REQUIRED INFORMATION:
1. Exact steps to reproduce
2. Expected vs. actual behavior
3. Complete error messages with stack traces
4. Relevant code snippets with line numbers
5. State of the system when issue occurs
6. Proposed solution with reasoning
```

### 8. TESTING AND VALIDATION

**Validation Requirements**:

- Test the exact scenario that was failing.
- Verify edge cases and timing scenarios.
- Check that the fix doesn't break other functionality.
- Confirm logging shows expected behavior.
- Test multiple cycles (start/stop/restart).

## SPECIFIC GUIDANCE FOR COMMON ISSUES

### Timestamp-Based Problems

```
SYMPTOMS: Different values on subsequent calls
ROOT CAUSE: Usually `new Date()` called multiple times
SOLUTION: Cache timestamp-based values at creation time
```

### Session Management Issues

```
SYMPTOMS: State not persisting, different values across calls
ROOT CAUSE: State not properly cached or multiple initialization
SOLUTION: Implement proper singleton pattern with cached state
```

### File Path Consistency

```
SYMPTOMS: Multiple files created, wrong file referenced
ROOT CAUSE: Path generation called multiple times with timestamps
SOLUTION: Generate and cache path once per session
```

## RESPONSE FORMAT FOR TROUBLESHOOTING

When analyzing issues, structure responses as:

```
## Issue Analysis
**Symptom:** [What the user is experiencing]
**Root Cause:** [Why it's happening - with code evidence]
**Code Path:** [Complete flow from trigger to problem]
**Solution:** [Specific fix with implementation]
**Validation:** [How to verify the fix works]
```

## QUALITY STANDARDS

**BEFORE providing any solution:**

1. ✅ Have you traced the complete execution flow?
2. ✅ Have you identified all state/caching mechanisms?
3. ✅ Have you found the exact location of the problem?
4. ✅ Have you verified your solution addresses the root cause?
5. ✅ Have you considered edge cases and side effects?

**NEVER:**

- ❌ Assume how code works without reading it
- ❌ Provide solutions without understanding the problem
- ❌ Make changes without considering the full workflow
- ❌ Ignore timing and state management issues
- ❌ Skip validation of proposed fixes

This systematic approach prevents the "trial and error" cycle that wastes time and ensures issues are properly understood and resolved.
