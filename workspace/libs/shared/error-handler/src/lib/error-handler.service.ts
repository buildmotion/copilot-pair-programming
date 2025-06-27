import { ErrorHandler, Injectable, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingConfig } from './models/error-handling-config.model';
import { ERROR_HANDLING_CONFIG } from './tokens/error-handling-config.token';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(
    @Inject(ERROR_HANDLING_CONFIG) private config: ErrorHandlingConfig
  ) {
    console.info('ErrorHandlerService initialized with config:', config);
    super();
  }

  override handleError(error: Error | HttpErrorResponse): void {
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
    const externalConfig = this.config.externalLoggingConfig;
    if (!externalConfig) {
      console.warn('External logging config is missing.');
      return;
    }
    const { apiKey, endpoint } = externalConfig;
    console.log(`Logging to external service: ${endpoint}`, {
      apiKey,
      error,
    });
  }
}
