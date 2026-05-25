import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./features/about/pages/about-page/about-page').then((module) => module.AboutPage),
  },
  {
    path: 'search',
    loadChildren: () => import('./features/search/search.routes').then((module) => module.SEARCH_ROUTES),
  },
];
