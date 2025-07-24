# Automated Test-Fix Automation Prompt

> **Instruction Compliance:**
> This prompt must be used in conjunction with `.github/instructions/jest-testing.instructions.md`.
> All automated test fixes and generated code must comply with the Jest testing standards, structure, and best practices defined in that instruction file.

## Overview

Automate the process of fixing failing tests in a TypeScript/Angular/Jest codebase. The goal is to create clean, maintainable code using pragmatic practices and SOLID principles, while minimizing negative side effects. Use the current chat session and test/lint history as context.

## Instructions for the Agent

1. **Run All Tests**

   - Execute the full test suite using `npx jest --all --ci` (or the project’s test runner).
   - Capture all failures, including error messages and stack traces.

2. **Analyze Failures**

   - For each failing test, identify the root cause by reading the actual implementation and test code.
   - Use evidence-based diagnosis: compare expected vs. actual behavior, check for missing mocks, incorrect assertions, or framework integration issues.
   - If a failure is due to a missing or misconfigured dependency (e.g., Angular module, provider, or selector), update the test setup accordingly.

3. **Apply Safe, Minimal Fixes Automatically**

   - All test fixes, new tests, and refactors must strictly follow the guidelines in `.github/instructions/jest-testing.instructions.md` (naming, structure, mocking, edge cases, etc.).
   - Automatically make only the changes required to resolve the test failure, without requiring human intervention. Focus exclusively on test operations and test compliance, not linting or code style enforcement.
   - If a component implements a lifecycle interface (e.g., `OnInit`) but has no logic in the corresponding method (e.g., `ngOnInit` is empty), remove both the `implements` clause and the empty lifecycle method. This follows Angular best practices and avoids unnecessary code.
   - Use best practices for Jest and Angular testing (e.g., TestBed configuration, dependency injection, mocking).
   - Add comments for framework-required code only when necessary.
   - Do not introduce breaking changes or negative side effects.

4. **Validate Each Fix**

   - Rerun the affected test(s) after each change to confirm the fix.
   - Ensure that previously passing tests remain green.

5. **SOLID and Pragmatic Principles**

   - Refactor code only if necessary to resolve the root cause or improve testability.
   - Favor composition, clear separation of concerns, and single responsibility.
   - Use dependency injection and mocking to isolate units under test.

6. **Notify for Fundamental Refactor Needs**

   - If a test failure requires a fundamental refactor (e.g., architectural change, deep coupling, or anti-pattern), notify the user with a clear explanation and recommended next steps.
   - Do not attempt large-scale refactors automatically.

7. **Leverage Context7 for Research**

   - If additional context or best practices are needed, use Context7 to find the relevant library ID and research the latest recommendations for Angular, Jest, or TypeScript.

8. **Report and Document**
   - Summarize the changes made, including what was fixed and why.
   - List any tests that could not be fixed automatically and require manual intervention.

## Example Workflow

```
1. Run all tests and collect failures.
2. For each failure:
   - Read the test and implementation code.
   - Diagnose the root cause.
   - Apply a safe, minimal fix.
   - Rerun the test to confirm.
3. If a test cannot be fixed without a fundamental refactor, notify the user.
4. Summarize all changes and next steps.
```

## Quality Standards

- All fixes must be validated by rerunning tests.
- No breaking changes or regressions.
- Code must remain clean, maintainable, and idiomatic.
- Comments should clarify test-related or framework-required code only when necessary.
- All changes must comply with `.github/instructions/jest-testing.instructions.md`.
