import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    {
        path: 'account',
        loadChildren: () => import('@spicy-vibes/account-ui').then(m => m.AccountUiModule),
    },
    { path: '**', redirectTo: '' },
];
