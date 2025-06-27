---
applyTo: "**/*.spec.ts,**/*.test.ts,**/test/**/*.ts"
---

# Jest Testing Instructions

## Purpose

This instruction provides comprehensive Jest testing guidelines for TypeScript projects, focusing on unit testing, integration testing, and test organization. It establishes best practices for creating maintainable, reliable tests that provide confidence in code quality.

## Core Testing Principles

### Test Philosophy
- Tests should be readable, maintainable, and provide clear failure messages
- Tests should run fast and be deterministic
- Focus on testing critical functionality and business logic
- Prioritize unit tests over integration tests, integration tests over end-to-end tests

### Test Coverage Strategy
- Aim for high coverage of business logic and utility functions
- Test edge cases and error conditions
- Don't chase 100% coverage at the expense of test quality
- Focus on meaningful assertions that verify expected behavior

## Test Organization

### File Structure
- Place test files adjacent to source files: `user.service.ts` → `user.service.spec.ts`
- Use `.spec.ts` for unit tests and `.test.ts` for integration tests
- Group related tests in `describe` blocks
- Use nested `describe` blocks for different scenarios or method groups

### Test Naming
- Use descriptive test names that explain the scenario and expected outcome
- Follow the pattern: "should [expected behavior] when [condition]"
- Use clear variable names: `inputData`, `mockUser`, `actualResult`, `expectedOutput`

```typescript
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user data when valid ID is provided', () => {
      // Test implementation
    });

    it('should throw error when user is not found', () => {
      // Test implementation
    });
  });
});
```

## Test Structure

### Arrange-Act-Assert Pattern
Structure all tests using the AAA pattern with clear separation:

```typescript
it('should calculate total for valid items with tax', () => {
  // Arrange
  const inputItems = [
    { price: 10, quantity: 2 },
    { price: 20, quantity: 1 }
  ];
  const expectedTotal = 44; // (10 * 2 + 20 * 1) * 1.1 (tax)

  // Act
  const actualTotal = calculateTotal(inputItems);

  // Assert
  expect(actualTotal).toBe(expectedTotal);
});
```

### Test Data Management
- Create realistic test data that represents actual use cases
- Use factory functions or builders for complex test data
- Keep test data close to the test for clarity
- Use constants for reusable test values

## Mocking and Test Doubles

### Dependency Mocking
- Mock external dependencies before imports using `jest.mock()`
- Mock expensive operations (API calls, file system, database)
- Don't mock inexpensive operations unless necessary for isolation

```typescript
// Mock dependencies before imports
jest.mock('../api/userService', () => ({
  fetchUser: jest.fn(),
}));

import { fetchUser } from '../api/userService';
import { getUserData } from '../utils/userUtils';

const mockFetchUser = fetchUser as jest.Mock;
```

### Mock Configuration
- Clear all mocks in `beforeEach` to ensure test isolation
- Configure mock return values for each test scenario
- Use `mockResolvedValue` and `mockRejectedValue` for async operations

```typescript
describe('getUserData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data when fetch is successful', async () => {
    // Arrange
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockFetchUser.mockResolvedValue(mockUser);

    // Act
    const result = await getUserData(1);

    // Assert
    expect(fetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });
});
```

## Test Scenarios and Edge Cases

### Data Validation Testing
- Test with valid inputs (happy path)
- Test with invalid inputs (various types of bad data)
- Test with edge cases (null, undefined, empty arrays/objects)
- Test with boundary values (min/max ranges)

```typescript
describe('calculateTotal', () => {
  it('should calculate total for valid items', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(22); // with 10% tax
  });

  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should throw error for null input', () => {
    expect(() => calculateTotal(null)).toThrow('Items must be an array');
  });

  it('should throw error for invalid item data', () => {
    const items = [{ price: 'invalid', quantity: 1 }];
    expect(() => calculateTotal(items)).toThrow('Invalid price or quantity');
  });
});
```

### Async Testing
- Use `async/await` for testing asynchronous code
- Test both successful and failed async operations
- Use proper timeout handling for long-running operations

```typescript
it('should handle API errors gracefully', async () => {
  // Arrange
  mockFetchUser.mockRejectedValue(new Error('Network error'));

  // Act & Assert
  await expect(getUserData(999)).rejects.toThrow('Failed to fetch user: Network error');
});
```

## Testing TypeScript-Specific Features

### Type Safety in Tests
- Maintain type safety in test code
- Use proper types for mock functions and test data
- Leverage TypeScript interfaces for test object creation

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});
```

### Testing Generic Functions
- Test with multiple type parameters
- Verify type constraints are respected
- Test edge cases specific to generic implementations

## Integration Testing

### Module Testing
- Test complete modules with real dependencies when appropriate
- Use test databases or in-memory alternatives
- Test critical integration points between modules

### Testing External Dependencies
- Use test doubles for external APIs
- Test error handling for external service failures
- Verify retry logic and timeout handling

## Performance Testing

### Test Performance
- Keep individual tests fast (< 100ms)
- Use `beforeAll` and `afterAll` for expensive setup/teardown
- Avoid unnecessary mocking that doesn't improve test performance

### Test Isolation
- Ensure tests can run in any order
- Clean up side effects in `afterEach`
- Don't rely on shared state between tests

## Best Practices

### Test Maintenance
- Refactor tests when refactoring production code
- Keep tests simple and focused
- Remove obsolete tests promptly
- Update test documentation when behavior changes

### Assertion Best Practices
- Use specific matchers for better error messages
- Prefer `toEqual` over `toBe` for object comparison
- Use `toBeCloseTo` for floating-point comparisons
- Test one concept per test case

```typescript
// Good - specific matchers
expect(user.isActive).toBe(true);
expect(user.roles).toContain('admin');
expect(user.lastLogin).toBeInstanceOf(Date);

// Good - object comparison
expect(result).toEqual({
  id: 1,
  name: 'John',
  email: 'john@example.com'
});
```

### Test Documentation
- Write descriptive test names that serve as documentation
- Use comments sparingly in tests - prefer self-documenting code
- Document complex test setup or unusual testing scenarios

## Framework-Specific Guidelines

### Angular Testing
- Use Angular Testing Utilities for component and service testing
- Mock Angular dependencies appropriately
- Test component inputs, outputs, and lifecycle methods

### NestJS Testing
- Use NestJS testing module for integration tests
- Mock providers and dependencies in the testing module
- Test controllers, services, and guards separately

## Common Anti-Patterns to Avoid

- Testing implementation details instead of behavior
- Over-mocking that makes tests brittle
- Large test files with unclear organization
- Tests that depend on external resources without proper mocking
- Flaky tests that pass/fail inconsistently
- Testing private methods directly
- Shared mutable state between tests
- Missing assertions or meaningless assertions

## Validation Checklist

- [ ] Tests follow AAA pattern with clear separation
- [ ] Test names clearly describe scenario and expected outcome
- [ ] External dependencies are properly mocked
- [ ] Edge cases and error conditions are tested
- [ ] Tests are isolated and can run in any order
- [ ] Mock functions are cleared between tests
- [ ] Async operations are properly awaited
- [ ] Type safety is maintained in test code
- [ ] Tests provide meaningful error messages on failure
