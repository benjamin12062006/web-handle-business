import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth-test' },
  {
    path: 'auth-test',
    loadComponent: () =>
      import('./auth/pages/auth-test/auth-test-page').then((m) => m.AuthTestPage),
  },
];
