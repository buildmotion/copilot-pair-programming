export interface ErrorHandlingConfig {
  applicationName: string;
  includeDefaultErrorHandling: boolean;
  externalLoggingConfig?: {
    apiKey: string;
    endpoint: string;
  };
}
