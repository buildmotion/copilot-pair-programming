import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { ErrorHandler, Injectable } from '@angular/core';
import { AppComponent } from './app/app.component';
import {
  ErrorHandlerService,
  ERROR_HANDLING_CONFIG,
} from '@spicy-vibes/error-handler';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: ERROR_HANDLING_CONFIG,
      useValue: { logErrors: true, notifyUser: true },
    },
  ],
}).catch((err) => console.error(err));
