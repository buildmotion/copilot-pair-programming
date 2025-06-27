import { InjectionToken } from '@angular/core';
import { ErrorHandlingConfig } from '../models/error-handling-config.model';

export const ERROR_HANDLING_CONFIG = new InjectionToken<ErrorHandlingConfig>(
  'ErrorHandlingConfig'
);
