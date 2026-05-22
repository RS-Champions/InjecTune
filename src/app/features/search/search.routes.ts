import { Routes } from '@angular/router';

export const SEARCH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/search-page/search-page').then((module) => module.SearchPage),
  },
];
