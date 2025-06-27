---
applyTo: "**"
---

# Prompt: Create a Standalone Injectable ErrorHandlerService for Angular Apps

## Task Description

Create an `ErrorHandlerService` in the `error-handler` library project of an Nx workspace. The service should be injectable using Angular's latest standalone syntax and adhere to best practices for centralized error handling. It must support both HTTP and client-side errors, integrate with external logging systems, and provide configurable behavior for different environments.

## Requirements

1. **Standalone Service**: Use Angular's `@Injectable()` decorator without relying on a module.
2. **Extend Angular's `ErrorHandler`**: Override the default error handling behavior.
3. **Configuration Support**: Accept configuration for application name, logging options, and external logging service details.
4. **Logging Integration**: Log errors to the console in development and send them to an external logging service in production.
5. **HTTP Error Handling**: Handle `HttpErrorResponse` errors seamlessly.
6. **Reusable Library**: Build the service as part of a publishable library in the Nx workspace.

## Implementation Details

### Service Code

```typescript
// filepath: libs/error-handler/src/lib/error-handler.service.ts
import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandlingConfig } from "./models/error-handling-config.model";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private config: ErrorHandlingConfig) {
    super();
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (this.config.includeDefaultErrorHandling) {
      super.handleError(error);
    }

    if (error instanceof HttpErrorResponse) {
      console.error(`HTTP Error: ${error.message}`, error);
    } else {
      console.error(`Client Error: ${error.message}`, error);
    }

    if (this.config.externalLoggingConfig) {
      this.logToExternalService(error);
    }
  }

  private logToExternalService(error: Error | HttpErrorResponse): void {
    const { apiKey, endpoint } = this.config.externalLoggingConfig!;
    // Example: Send error details to external logging service
    console.log(`Logging to external service: ${endpoint}`, {
      apiKey,
      error,
    });
  }
}
```

### Configuration Model

```typescript
// filepath: libs/error-handler/src/lib/models/error-handling-config.model.ts
export interface ErrorHandlingConfig {
  applicationName: string;
  includeDefaultErrorHandling: boolean;
  externalLoggingConfig?: {
    apiKey: string;
    endpoint: string;
  };
}
```

### Example Configuration

```typescript
// filepath: apps/my-app/src/config/app-config.ts
export const APP_CONFIG = {
  errorHandlingConfig: {
    applicationName: "MyAngularApp",
    includeDefaultErrorHandling: true,
    externalLoggingConfig: {
      apiKey: "your-api-key",
      endpoint: "https://logging-service.example.com",
    },
  },
};
```

### Usage Instructions

1. Provide the configuration using a `ConfigurationService` or `InjectionToken`.
2. Ensure the service is automatically injected into the application via `providedIn: 'root'`.

---

This prompt provides a clear and structured approach to creating the standalone `ErrorHandlerService` while adhering to Angular and Nx best practices.
