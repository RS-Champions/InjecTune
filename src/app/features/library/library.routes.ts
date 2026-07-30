import { Routes } from '@angular/router';
import { PageName } from '@shared/constants/page-name';
import { playlistEmptyGuard } from './guards/playlist-empty-guard';

export const LIBRARY_ROUTES: Routes = [
  {
    path: '',
    data: { preload: true },
    loadComponent: () => import('./pages/library-page/library-page').then((module) => module.LibraryPage),
  },
  {
    path: `${PageName.PLAYLISTS}/:id`,
    data: { preload: false },
    canDeactivate: [playlistEmptyGuard],
    loadComponent: () =>
      import('./pages/playlist-details-page/playlist-details-page').then((module) => module.PlaylistDetailsPage),
  },
];
