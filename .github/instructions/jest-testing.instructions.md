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
describe("UserService", () => {
  describe("getUserById", () => {
    it("should return user data when valid ID is provided", () => {
      // Test implementation
    });

    it("should throw error when user is not found", () => {
      // Test implementation
    });
  });
});
```

## Test Structure

### Arrange-Act-Assert Pattern

Structure all tests using the AAA pattern with clear separation:

```typescript
it("should calculate total for valid items with tax", () => {
  // Arrange
  const inputItems = [
    { price: 10, quantity: 2 },
    { price: 20, quantity: 1 },
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
jest.mock("../api/userService", () => ({
  fetchUser: jest.fn(),
}));

import { fetchUser } from "../api/userService";
import { getUserData } from "../utils/userUtils";

const mockFetchUser = fetchUser as jest.Mock;
```

### Mock Configuration

- Clear all mocks in `beforeEach` to ensure test isolation
- Configure mock return values for each test scenario
- Use `mockResolvedValue` and `mockRejectedValue` for async operations

```typescript
describe("getUserData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data when fetch is successful", async () => {
    // Arrange
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
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
describe("calculateTotal", () => {
  it("should calculate total for valid items", () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(22); // with 10% tax
  });

  it("should handle empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("should throw error for null input", () => {
    expect(() => calculateTotal(null)).toThrow("Items must be an array");
  });

  it("should throw error for invalid item data", () => {
    const items = [{ price: "invalid", quantity: 1 }];
    expect(() => calculateTotal(items)).toThrow("Invalid price or quantity");
  });
});
```

### Async Testing

- Use `async/await` for testing asynchronous code
- Test both successful and failed async operations
- Use proper timeout handling for long-running operations

```typescript
it("should handle API errors gracefully", async () => {
  // Arrange
  mockFetchUser.mockRejectedValue(new Error("Network error"));

  // Act & Assert
  await expect(getUserData(999)).rejects.toThrow(
    "Failed to fetch user: Network error"
  );
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
  name: "Test User",
  email: "test@example.com",
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

### Incremental Testing Approach

Start with minimal tests and gradually build toward comprehensive coverage:

1. **Start with a minimal test setup**

   - Create a single test file with one `describe` block and one basic test
   - Verify the simplest functionality first (e.g., service instantiation)
   - Ensure the test infrastructure works before adding complexity

2. **Add happy path tests**

   - Test the main functionality under normal conditions
   - Cover the primary use cases that represent expected behavior
   - Build confidence in core functionality

3. **Add negative and alternate flow tests**
   - Test error conditions and edge cases
   - Cover different configuration options
   - Test how the code handles unexpected inputs

```typescript
// Example of incremental test development
describe("ErrorHandlerService", () => {
  // Start with minimal test - service creation
  it("should be created", () => {
    const service = new ErrorHandlerService(mockConfig);
    expect(service).toBeTruthy();
  });

  // Add happy path tests
  it("should handle client errors correctly", () => {
    const error = new Error("Test error");
    service.handleError(error);
    expect(console.error).toHaveBeenCalledWith(
      "Client Error: Test error",
      error
    );
  });

  // Add negative/alternate flow tests
  it("should not log to external service when not configured", () => {
    const configWithoutExternalLogging = {
      ...mockConfig,
      externalLoggingConfig: undefined,
    };
    const service = new ErrorHandlerService(configWithoutExternalLogging);

    const error = new Error("Test error");
    service.handleError(error);

    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining("Logging to external service"),
      expect.anything()
    );
  });
});
```

## Case Studies

### Incremental Test Development: ErrorHandlerService

Below is an example showing how tests for a service evolved from minimal to comprehensive:

#### 1. Minimal Test (Service Creation)

```typescript
describe("ErrorHandlerService", () => {
  let service: ErrorHandlerService;
  let mockConfig: ErrorHandlingConfig;

  beforeEach(() => {
    mockConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: true,
    };
    service = new ErrorHandlerService(mockConfig);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```

#### 2. Happy Path Tests

```typescript
describe("ErrorHandlerService", () => {
  // ... setup code ...

  // Mock console methods to verify they were called
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
    // ... other setup ...
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // Happy path tests
  it("should handle client errors correctly", () => {
    const error = new Error("Test client error");
    service.handleError(error);

    expect(console.error).toHaveBeenCalledWith(
      "Client Error: Test client error",
      error
    );
  });

  it("should handle HTTP errors correctly", () => {
    const httpError = new HttpErrorResponse({
      status: 404,
      statusText: "Not Found",
    });
    service.handleError(httpError);

    expect(console.error).toHaveBeenCalledWith(
      `HTTP Error: ${httpError.message}`,
      httpError
    );
  });
});
```

#### 3. Alternate Flow Tests

```typescript
describe("ErrorHandlerService", () => {
  // ... previous code ...

  // Alternate flow tests
  it("should not log to external service when not configured", () => {
    const configWithoutExternalLogging: ErrorHandlingConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: true,
      // No external logging config
    };
    const serviceWithoutExternalLogging = new ErrorHandlerService(
      configWithoutExternalLogging
    );

    const error = new Error("Test error without external logging");
    serviceWithoutExternalLogging.handleError(error);

    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining("Logging to external service"),
      expect.anything()
    );
  });

  it("should respect includeDefaultErrorHandling flag", () => {
    // Test with flag = false
    const configWithoutDefaultHandling: ErrorHandlingConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: false,
    };

    // Mock the parent class method
    const originalHandleError = ErrorHandler.prototype.handleError;
    ErrorHandler.prototype.handleError = jest.fn();

    try {
      const serviceWithoutDefaultHandling = new ErrorHandlerService(
        configWithoutDefaultHandling
      );
      serviceWithoutDefaultHandling.handleError(new Error("Test"));

      expect(ErrorHandler.prototype.handleError).not.toHaveBeenCalled();
    } finally {
      // Restore original method
      ErrorHandler.prototype.handleError = originalHandleError;
    }
  });
});
```

This case study demonstrates the value of starting simple and gradually adding complexity. Each phase builds on the previous one, creating a comprehensive test suite that covers all major scenarios.

## Complete Reference Example

Below is a complete, production-ready test file for `ErrorHandlerService` that demonstrates all the best practices covered in this instruction:

```typescript
import { ErrorHandlerService } from "./error-handler.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandlingConfig } from "./models/error-handling-config.model";
import { ErrorHandler } from "@angular/core";

describe("ErrorHandlerService", () => {
  let service: ErrorHandlerService;
  let mockConfig: ErrorHandlingConfig;

  // Mock console methods to verify they were called
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;

  beforeEach(() => {
    // Setup mock config
    mockConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: true,
      externalLoggingConfig: {
        apiKey: "test-api-key",
        endpoint: "https://logging.example.com/api",
      },
    };

    // Mock console methods
    console.error = jest.fn();
    console.warn = jest.fn();
    console.log = jest.fn();
    console.info = jest.fn();

    // Create service with mock config
    service = new ErrorHandlerService(mockConfig);
  });

  afterEach(() => {
    // Restore console methods
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.log = originalConsoleLog;
    console.info = originalConsoleInfo;

    jest.clearAllMocks();
  });

  // 1. MINIMAL TEST - Service Creation
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should log initialization with config", () => {
    expect(console.info).toHaveBeenCalledWith(
      "ErrorHandlerService initialized with config:",
      mockConfig
    );
  });

  // 2. HAPPY PATH TESTS - Main functionality
  it("should handle client errors correctly", () => {
    const error = new Error("Test client error");
    service.handleError(error);

    expect(console.error).toHaveBeenCalledWith(
      "Client Error: Test client error",
      error
    );
  });

  it("should handle HTTP errors correctly", () => {
    const httpError = new HttpErrorResponse({
      status: 404,
      statusText: "Not Found",
    });
    service.handleError(httpError);

    expect(console.error).toHaveBeenCalledWith(
      `HTTP Error: ${httpError.message}`,
      httpError
    );
  });

  it("should log to external service when configured", () => {
    const error = new Error("Test error for external logging");
    service.handleError(error);

    expect(console.log).toHaveBeenCalledWith(
      `Logging to external service: ${mockConfig.externalLoggingConfig?.endpoint}`,
      {
        apiKey: mockConfig.externalLoggingConfig?.apiKey,
        error,
      }
    );
  });

  // 3. ALTERNATE FLOW TESTS - Edge cases and configuration variants
  it("should not log to external service when not configured", () => {
    // Reset mock functions
    jest.clearAllMocks();

    // Create a service without external logging config
    const configWithoutExternalLogging: ErrorHandlingConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: true,
    };
    const serviceWithoutExternalLogging = new ErrorHandlerService(
      configWithoutExternalLogging
    );

    const error = new Error("Test error without external logging");
    serviceWithoutExternalLogging.handleError(error);

    // Check that we never called log (which would happen with external logging)
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining("Logging to external service"),
      expect.anything()
    );
  });

  it("should respect includeDefaultErrorHandling flag", () => {
    // Mock the parent class method
    const originalHandleError = ErrorHandler.prototype.handleError;
    ErrorHandler.prototype.handleError = jest.fn();

    // Test with includeDefaultErrorHandling = true
    const error = new Error("Test error with default handling");
    service.handleError(error);
    expect(ErrorHandler.prototype.handleError).toHaveBeenCalledWith(error);

    // Test with includeDefaultErrorHandling = false
    ErrorHandler.prototype.handleError = jest.fn(); // Reset mock
    const configWithoutDefaultHandling: ErrorHandlingConfig = {
      applicationName: "TestApp",
      includeDefaultErrorHandling: false,
    };
    const serviceWithoutDefaultHandling = new ErrorHandlerService(
      configWithoutDefaultHandling
    );
    serviceWithoutDefaultHandling.handleError(error);
    expect(ErrorHandler.prototype.handleError).not.toHaveBeenCalled();

    // Restore original method
    ErrorHandler.prototype.handleError = originalHandleError;
  });
});
```

This comprehensive example demonstrates:

1. **Proper Test Setup**: Mocking dependencies and restoring them afterward
2. **Incremental Testing**: Starting with minimal tests, then adding happy path and edge cases
3. **Effective Mocking**: Handling side effects (console methods) and parent class methods
4. **Clean Assertions**: Clear, specific expectations that validate behavior
5. **Test Organization**: Logically grouped tests with increasing complexity

## Testing Services in Angular and TypeScript

When testing services, follow these specific guidelines in addition to the general principles:

### Service Testing Strategy

1. **Start with Constructor Initialization**

   - Verify service can be created with all required dependencies
   - Test initialization logic and configuration loading

2. **Test Public Methods Individually**

   - Test each public method in isolation
   - Cover all parameters and return values

3. **Test Error Handling and Recovery**
   - Ensure services properly handle and report errors
   - Test retry logic and fallbacks where applicable

### Dependencies and Mocking

For services with dependencies (DI or direct):

```typescript
// Testing a service with dependencies
describe("DataService", () => {
  let service: DataService;
  let mockApiClient: jest.Mocked<ApiClient>;
  let mockCache: jest.Mocked<CacheService>;

  beforeEach(() => {
    // Create mocks
    mockApiClient = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ApiClient>;

    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      clear: jest.fn(),
    } as unknown as jest.Mocked<CacheService>;

    // Create service with mocks
    service = new DataService(mockApiClient, mockCache);
  });

  it("should check cache before calling API", async () => {
    const cacheKey = "users/123";
    const cachedData = { id: 123, name: "Test User" };

    // Setup cache hit
    mockCache.get.mockReturnValue(cachedData);

    // Call service
    const result = await service.getUser(123);

    // Verify cache was checked
    expect(mockCache.get).toHaveBeenCalledWith(cacheKey);

    // Verify API was NOT called (cache hit)
    expect(mockApiClient.get).not.toHaveBeenCalled();

    // Verify correct data returned
    expect(result).toEqual(cachedData);
  });
});
```

### Testing Services with Angular DI

For Angular services, you have two options:

1. **Direct Instantiation** (Recommended for unit tests)

   - Create service directly with mocked dependencies
   - More control and faster tests

2. **Angular TestBed** (For integration tests or complex DI)
   - Use Angular's testing utilities
   - Required when testing providers, injection tokens, etc.

```typescript
// Using TestBed
import { TestBed } from "@angular/core/testing";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AUTH_CONFIG, useValue: mockAuthConfig },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should authenticate user", () => {
    // Test implementation
  });
});
```
