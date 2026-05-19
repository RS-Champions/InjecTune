import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((module) => module.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup-page/signup-page').then((module) => module.SignupPage),
  },
];
