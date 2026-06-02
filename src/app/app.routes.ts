import { Routes } from '@angular/router';

export const ROUTE_PATHS = {
  ABOUT: 'about',
  SEARCH: 'search',
  DISCOVER: 'discover',
} as const;

export const routes: Routes = [
  {
    path: ROUTE_PATHS.ABOUT,
    loadComponent: () => import('./features/about/pages/about-page/about-page').then((module) => module.AboutPage),
  },
  {
    path: ROUTE_PATHS.SEARCH,
    loadChildren: () => import('./features/search/search.routes').then((module) => module.SEARCH_ROUTES),
  },
  {
    path: ROUTE_PATHS.DISCOVER,
    loadComponent: () =>
      import('./features/discover/pages/discover-page/discover-page').then((module) => module.DiscoverPage),
  },
];

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
