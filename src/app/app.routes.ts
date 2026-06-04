import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./features/about/pages/about-page/about-page').then((module) => module.AboutPage),
  },
  {
    path: 'album',
    loadChildren: () => import('./features/album/album.routes').then((module) => module.ALBUM_ROUTES),
  },
  {
    path: 'search',
    loadChildren: () => import('./features/search/search.routes').then((module) => module.SEARCH_ROUTES),
  },
  {
    path: 'discover',
    loadComponent: () =>
      import('./features/discover/pages/discover-page/discover-page').then((module) => module.DiscoverPage),
  },
];
