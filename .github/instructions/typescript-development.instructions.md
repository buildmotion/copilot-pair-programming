---
applyTo: "**/*.ts,**/*.js"
---

# TypeScript Development Instructions

## Purpose

This instruction provides comprehensive TypeScript development guidelines for projects using Angular, NestJS, and related technologies. It establishes coding standards, naming conventions, and best practices for clean, maintainable TypeScript code.

## Core Principles

### Type Safety
- Always declare explicit types for variables, function parameters, and return values
- Avoid using `any` type - create specific types instead
- Leverage TypeScript's strict mode for enhanced type checking
- Use union types and type guards for handling multiple possible types

### Code Organization
- One export per file for better tree-shaking and clarity
- Use English for all code and documentation
- Prefer composition over inheritance
- Follow SOLID principles in class design

### Documentation
- Use JSDoc to document public classes, interfaces, and methods
- Include parameter descriptions and return value explanations
- Document complex business logic with inline comments

## Code Standards

### Naming Conventions

#### Cases
- **PascalCase**: Classes, interfaces, types, enums
- **camelCase**: Variables, functions, methods, properties
- **kebab-case**: File and directory names
- **UPPER_SNAKE_CASE**: Constants and environment variables

#### Semantic Naming
- Start function names with verbs: `getUserData`, `validateInput`, `processOrder`
- Use descriptive boolean variable names: `isLoading`, `hasError`, `canDelete`, `shouldUpdate`
- Use complete words instead of abbreviations (except standard ones: API, URL, HTTP)
- Well-known abbreviations are acceptable:
  - `i`, `j` for loop counters
  - `err` for errors
  - `ctx` for contexts
  - `req`, `res`, `next` for middleware parameters

#### Constants
- Avoid magic numbers - define named constants
- Group related constants in enums or const objects
- Use descriptive names that explain the purpose

### Function Guidelines

#### Function Design
- Write short functions with single responsibility (≤20 lines)
- Use early returns to reduce nesting
- Extract complex logic into utility functions
- Prefer pure functions when possible

#### Function Types
- **Boolean functions**: Use `is*`, `has*`, `can*`, `should*` prefixes
- **Action functions**: Use `execute*`, `save*`, `update*`, `delete*` verbs
- **Query functions**: Use `get*`, `find*`, `fetch*`, `load*` verbs

#### Parameters and Returns
- Use default parameter values instead of null/undefined checks
- Apply RO-RO pattern (Receive Object, Return Object) for complex parameters
- Define specific types for input arguments and output values
- Limit function parameters (≤3 individual parameters, use objects for more)

#### Modern JavaScript Features
- Use arrow functions for simple operations (≤3 lines)
- Use named functions for complex logic
- Leverage higher-order functions: `map`, `filter`, `reduce`, `find`
- Use destructuring for object and array manipulation

### Class Design

#### Class Structure
- Keep classes focused and small:
  - ≤200 lines of code
  - ≤10 public methods
  - ≤10 properties
- Declare interfaces to define contracts
- Use access modifiers appropriately (`private`, `protected`, `public`)

#### Class Principles
- Single Responsibility: One reason to change
- Open/Closed: Open for extension, closed for modification
- Dependency Inversion: Depend on abstractions, not concretions
- Prefer composition over inheritance

### Data Management

#### Type Definitions
- Encapsulate data in composite types rather than primitives
- Use interfaces for object contracts
- Create specific types for domain concepts
- Use generic types for reusable components

#### Immutability
- Prefer immutable data structures
- Use `readonly` for data that shouldn't change
- Use `as const` for literal values
- Avoid direct mutation of objects and arrays

#### Validation
- Use classes with internal validation for complex data
- Avoid data validation scattered throughout functions
- Implement validation at domain boundaries

## Testing Requirements

### Test Structure
- Follow Arrange-Act-Assert (AAA) pattern
- Use descriptive test names that explain the scenario
- Name test variables clearly: `input*`, `mock*`, `actual*`, `expected*`

### Test Coverage
- Write unit tests for all public functions and methods
- Create integration tests for module interactions
- Use test doubles (mocks, stubs, spies) for dependencies
- Exception: Don't mock inexpensive third-party dependencies

### Test Organization
- Group related tests using `describe` blocks
- Use `beforeEach`/`afterEach` for test setup and cleanup
- Keep test files adjacent to source files
- Follow Given-When-Then pattern for acceptance tests

## Error Handling

### Exception Strategy
- Use exceptions for unexpected errors only
- Catch exceptions to:
  - Fix expected problems
  - Add context information
  - Transform error types
- Use global error handlers for unhandled exceptions

### Error Types
- Create specific error classes for different error categories
- Include relevant context in error messages
- Use error codes for programmatic error handling

## Performance Considerations

### Code Optimization
- Use appropriate data structures for the use case
- Leverage TypeScript's tree-shaking capabilities
- Avoid premature optimization
- Profile before optimizing

### Memory Management
- Clean up event listeners and subscriptions
- Use weak references when appropriate
- Avoid memory leaks in closures

## Integration Guidelines

### With Angular
- Follow Angular style guide naming conventions
- Use Angular CLI for code generation
- Leverage Angular's dependency injection
- Use TypeScript decorators appropriately

### With NestJS
- Follow NestJS architectural patterns
- Use TypeScript decorators for metadata
- Implement proper module boundaries
- Use DTOs for API validation

### With Testing Frameworks
- Configure TypeScript for test environments
- Use type-safe mocking libraries
- Maintain test type safety

## Validation Checklist

- [ ] All variables and functions have explicit types
- [ ] No usage of `any` type without justification
- [ ] Function names start with verbs
- [ ] Boolean variables use descriptive prefixes
- [ ] Classes follow single responsibility principle
- [ ] Public methods have JSDoc documentation
- [ ] Constants are named and avoid magic numbers
- [ ] Error handling is consistent and appropriate
- [ ] Tests follow AAA pattern with clear naming

## Common Anti-Patterns to Avoid

- Using `any` type as an escape hatch
- Large functions with multiple responsibilities
- Deep nesting without early returns
- Magic numbers and strings
- Mutable data without clear ownership
- Missing error handling
- Inconsistent naming conventions
- Missing type definitions for external APIs
