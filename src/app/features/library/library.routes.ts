import { Routes } from '@angular/router';

export const LIBRARY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/library-page/library-page').then((module) => module.LibraryPage),
  },
  {
    path: 'playlists/:id',
    loadComponent: () =>
      import('./pages/playlist-details-page/playlist-details-page').then((module) => module.PlaylistDetailsPage),
  },
];
