import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout';
import { EmptyLayoutComponent } from '@core/layout/empty-layout/empty-layout';
import { aboutLeaveGuard } from '@features/about/guards/about-leave-guard';
import { PageName } from '@shared/constants/page-name';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PageName.DISCOVER,
    pathMatch: 'full',
  },
  {
    path: PageName.ABOUT,
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        canDeactivate: [aboutLeaveGuard],
        loadComponent: () => import('@features/about/pages/about-page/about-page').then((module) => module.AboutPage),
      },
    ],
  },
  {
    path: PageName.ALBUM,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/album/album.routes').then((module) => module.ALBUM_ROUTES),
      },
    ],
  },
  {
    path: PageName.ARTIST,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/artist/artist.routes').then((module) => module.ARTIST_ROUTES),
      },
    ],
  },
  {
    path: PageName.DISCOVER,
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
    path: PageName.SEARCH,
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@features/search/pages/search-page/search-page').then((module) => module.SearchPage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@core/pages/not-found-page/not-found-page').then((module) => module.NotFoundPage),
  },
];

export type RoutePath = PageName;
