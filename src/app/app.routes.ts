import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { EmptyLayoutComponent } from './core/layout/empty-layout/empty-layout';

export const ROUTE_PATHS = {
  ABOUT: 'about',
  ALBUM: 'album',
  ARTIST: 'artist',
  DISCOVER: 'discover',
  SEARCH: 'search',
} as const;

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATHS.DISCOVER,
    pathMatch: 'full',
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@features/about/pages/about-page/about-page').then((module) => module.AboutPage),
      },
    ],
  },
  {
    path: ROUTE_PATHS.ALBUM,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/album/album.routes').then((module) => module.ALBUM_ROUTES),
      },
    ],
  },
  {
    path: ROUTE_PATHS.ARTIST,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/artist/artist.routes').then((module) => module.ARTIST_ROUTES),
      },
    ],
  },
  {
    path: ROUTE_PATHS.DISCOVER,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@features/discover/pages/discover-page/discover-page').then((module) => module.DiscoverPage),
      },
    ],
  },
  {
    path: ROUTE_PATHS.SEARCH,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/search/search.routes').then((module) => module.SEARCH_ROUTES),
      },
    ],
  },
];

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
