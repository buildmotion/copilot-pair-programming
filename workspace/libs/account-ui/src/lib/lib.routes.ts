import { Route } from '@angular/router';

import { CreateAccountComponent } from './create-account.component';
export const accountUiRoutes: Route[] = [
  { path: '', component: CreateAccountComponent, pathMatch: 'full' },
];
  