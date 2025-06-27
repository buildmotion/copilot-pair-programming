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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log initialization with config', () => {
    expect(console.info).toHaveBeenCalledWith(
      'ErrorHandlerService initialized with config:',
      mockConfig
    );
  });

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
