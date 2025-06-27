import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from '@spicy-vibes/error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
