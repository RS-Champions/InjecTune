import { Routes } from '@angular/router';

export const ALBUM_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./pages/album-page/album-page').then((module) => module.AlbumPage),
  },
];
