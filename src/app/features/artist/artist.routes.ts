import { Routes } from '@angular/router';

export const ARTIST_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./pages/artist-page/artist-page').then((module) => module.ArtistPage),
  },
];
