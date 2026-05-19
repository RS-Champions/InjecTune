import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./features/about/pages/about-page/about-page').then((module) => module.AboutPage),
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then((module) => module.authRoutes),
  },
];
