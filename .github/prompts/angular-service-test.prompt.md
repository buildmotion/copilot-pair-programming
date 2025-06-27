# Angular Service Test Scaffold Prompt

## Purpose

This prompt helps you create comprehensive Jest tests for Angular services following our incremental testing best practices. It generates a test scaffold that progresses from minimal tests to complete test coverage.

## Usage

```
#prompt angular-service-test [path-to-service]
```

Example: `#prompt angular-service-test libs/shared/auth/src/lib/services/auth.service.ts`

## Questions

1. What dependencies does your service have? (List the constructor parameters)
2. Which public methods need testing?
3. Does the service handle HTTP requests?
4. Does the service have configuration options?
5. Does the service extend any base classes?

## Test Scaffold Generation

I'll create a Jest test file with:

1. **Minimal test**: Service instantiation
2. **Happy path tests**: Core functionality
3. **Alternate flow tests**: Edge cases, errors, config variations

## Testing Best Practices

- Mock external dependencies
- Use proper TypeScript typing 
- Test public interfaces, not implementation details
- Include both happy path and error conditions
- Follow AAA pattern (Arrange-Act-Assert)

---

{{#if servicePath}}
Let me analyze the service at `{{servicePath}}` and generate a comprehensive test scaffold...
{{else}}
Please provide the path to the Angular service you want to test.
{{/if}}

## Step 1: Basic Service Test Setup

First, let's create a minimal test that verifies the service can be instantiated:

```typescript
import { {{serviceName}} } from './{{serviceFileName}}';
{{#if hasHttpClient}}
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
{{/if}}
{{#each imports}}
import { {{this}} } from '{{../importPaths.[this]}}';
{{/each}}

describe('{{serviceName}}', () => {
  let service: {{serviceName}};
  {{#if hasMockDependencies}}
  {{#each dependencies}}
  let mock{{this.name}}: jest.Mocked<{{this.type}}>;
  {{/each}}
  {{/if}}
  {{#if hasHttpClient}}
  let httpMock: HttpTestingController;
  {{/if}}
  
  // Store original console methods if service uses them
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;

  beforeEach(() => {
    {{#if hasMockDependencies}}
    // Create mocks for dependencies
    {{#each dependencies}}
    mock{{this.name}} = {
      {{#each this.methods}}
      {{this}}: jest.fn(){{#unless @last}},{{/unless}}
      {{/each}}
    } as unknown as jest.Mocked<{{this.type}}>;
    {{/each}}
    {{/if}}

    {{#if hasConsoleUsage}}
    // Mock console methods
    console.error = jest.fn();
    console.warn = jest.fn();
    console.log = jest.fn();
    console.info = jest.fn();
    {{/if}}

    {{#if useTestBed}}
    TestBed.configureTestingModule({
      {{#if hasHttpClient}}
      imports: [HttpClientTestingModule],
      {{/if}}
      providers: [
        {{serviceName}}
        {{#each dependencies}}
        { provide: {{this.token}}, useValue: mock{{this.name}} }{{#unless @last}},{{/unless}}
        {{/each}}
      ]
    });

    service = TestBed.inject({{serviceName}});
    {{#if hasHttpClient}}
    httpMock = TestBed.inject(HttpTestingController);
    {{/if}}
    {{else}}
    // Create service with mocked dependencies
    service = new {{serviceName}}(
      {{#each dependencies}}
      mock{{this.name}}{{#unless @last}},{{/unless}}
      {{/each}}
    );
    {{/if}}
  });

  afterEach(() => {
    {{#if hasConsoleUsage}}
    // Restore console methods
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.log = originalConsoleLog;
    console.info = originalConsoleInfo;
    {{/if}}

    jest.clearAllMocks();
    {{#if hasHttpClient}}
    httpMock.verify();
    {{/if}}
  });

  // 1. MINIMAL TEST
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  {{#if hasServiceConfig}}
  it('should initialize with correct configuration', () => {
    // Add assertions to verify configuration was set correctly
    // Example: expect(service.configValue).toBe(expectedValue);
  });
  {{/if}}
});
```

## Step 2: Adding Happy Path Tests

Let's add tests for the primary functionality:

```typescript
describe('{{serviceName}}', () => {
  // ... existing setup code ...

  // 2. HAPPY PATH TESTS
  {{#each methods}}
  describe('{{this.name}}', () => {
    {{#if this.isAsync}}
    it('should {{this.description}}', async () => {
      {{#if this.hasParams}}
      // Arrange
      const testInput = { /* Create test input matching the method parameters */ };
      {{/if}}
      {{#if this.hasDependencies}}
      {{#each this.dependencies}}
      mock{{this}}.{{../dependencyMethods.[this]}}.mockReturnValue(/* Mock return value */);
      {{/each}}
      {{/if}}

      // Act
      const result = await service.{{this.name}}({{#if this.hasParams}}testInput{{/if}});

      // Assert
      expect(result).toBeDefined();
      {{#if this.hasDependencies}}
      {{#each this.dependencies}}
      expect(mock{{this}}.{{../dependencyMethods.[this]}}).toHaveBeenCalled();
      {{/each}}
      {{/if}}
    });
    {{else}}
    it('should {{this.description}}', () => {
      {{#if this.hasParams}}
      // Arrange
      const testInput = { /* Create test input matching the method parameters */ };
      {{/if}}
      {{#if this.hasDependencies}}
      {{#each this.dependencies}}
      mock{{this}}.{{../dependencyMethods.[this]}}.mockReturnValue(/* Mock return value */);
      {{/each}}
      {{/if}}

      // Act
      const result = service.{{this.name}}({{#if this.hasParams}}testInput{{/if}});

      // Assert
      expect(result).toBeDefined();
      {{#if this.hasDependencies}}
      {{#each this.dependencies}}
      expect(mock{{this}}.{{../dependencyMethods.[this]}}).toHaveBeenCalled();
      {{/each}}
      {{/if}}
    });
    {{/if}}
  });
  {{/each}}

  {{#if hasHttpClient}}
  // HTTP Client specific tests
  describe('HTTP operations', () => {
    it('should make correct API calls', () => {
      // Example HTTP test
      service.fetchData();
      
      const req = httpMock.expectOne('expected-url');
      expect(req.request.method).toBe('GET');
      
      req.flush({ sample: 'response' });
    });
    
    it('should handle HTTP errors', () => {
      // Example HTTP error test
      service.fetchData();
      
      const req = httpMock.expectOne('expected-url');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      
      // Assert error handling
    });
  });
  {{/if}}
});
```

## Step 3: Adding Alternate Flow Tests

Now let's add tests for edge cases and error conditions:

```typescript
describe('{{serviceName}}', () => {
  // ... existing code ...

  // 3. ALTERNATE FLOW TESTS
  describe('error handling', () => {
    {{#each methods}}
    {{#if this.needsErrorTest}}
    it('should handle errors in {{this.name}}', {{#if this.isAsync}}async {{/if}}() => {
      {{#if this.hasDependencies}}
      {{#each this.dependencies}}
      mock{{this}}.{{../dependencyMethods.[this]}}.mockImplementation(() => {
        throw new Error('Test error');
      });
      {{/each}}
      {{/if}}

      {{#if this.isAsync}}
      await expect(async () => {
        await service.{{this.name}}(/* params */);
      }).rejects.toThrow();
      {{else}}
      expect(() => {
        service.{{this.name}}(/* params */);
      }).toThrow();
      {{/if}}
    });
    {{/if}}
    {{/each}}
  });

  {{#if hasConfig}}
  describe('configuration variants', () => {
    it('should work with alternative configuration', () => {
      // Test with different configuration options
    });
  });
  {{/if}}

  {{#if extends}}
  describe('inherited behavior', () => {
    it('should handle parent class functionality correctly', () => {
      // Test interaction with parent class
    });
  });
  {{/if}}
});
```

## Complete Example

Here's a complete example of a test for an `ErrorHandlerService`:

```typescript
import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingConfig } from './models/error-handling-config.model';
import { ErrorHandler } from '@angular/core';

describe('ErrorHandlerService', () => {
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
      applicationName: 'TestApp',
      includeDefaultErrorHandling: true,
      externalLoggingConfig: {
        apiKey: 'test-api-key',
        endpoint: 'https://logging.example.com/api',
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
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log initialization with config', () => {
    expect(console.info).toHaveBeenCalledWith(
      'ErrorHandlerService initialized with config:',
      mockConfig
    );
  });

  // 2. HAPPY PATH TESTS - Main functionality
  it('should handle client errors correctly', () => {
    const error = new Error('Test client error');
    service.handleError(error);

    expect(console.error).toHaveBeenCalledWith(
      'Client Error: Test client error',
      error
    );
  });

  it('should handle HTTP errors correctly', () => {
    const httpError = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });
    service.handleError(httpError);

    expect(console.error).toHaveBeenCalledWith(
      `HTTP Error: ${httpError.message}`,
      httpError
    );
  });

  it('should log to external service when configured', () => {
    const error = new Error('Test error for external logging');
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
  it('should not log to external service when not configured', () => {
    // Reset mock functions
    jest.clearAllMocks();

    // Create a service without external logging config
    const configWithoutExternalLogging: ErrorHandlingConfig = {
      applicationName: 'TestApp',
      includeDefaultErrorHandling: true,
    };
    const serviceWithoutExternalLogging = new ErrorHandlerService(
      configWithoutExternalLogging
    );

    const error = new Error('Test error without external logging');
    serviceWithoutExternalLogging.handleError(error);

    // Check that we never called log (which would happen with external logging)
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining('Logging to external service'),
      expect.anything()
    );
  });

  it('should respect includeDefaultErrorHandling flag', () => {
    // Mock the parent class method
    const originalHandleError = ErrorHandler.prototype.handleError;
    ErrorHandler.prototype.handleError = jest.fn();

    // Test with includeDefaultErrorHandling = true
    const error = new Error('Test error with default handling');
    service.handleError(error);
    expect(ErrorHandler.prototype.handleError).toHaveBeenCalledWith(error);

    // Test with includeDefaultErrorHandling = false
    ErrorHandler.prototype.handleError = jest.fn(); // Reset mock
    const configWithoutDefaultHandling: ErrorHandlingConfig = {
      applicationName: 'TestApp',
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
