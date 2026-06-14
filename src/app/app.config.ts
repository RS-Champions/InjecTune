import { provideTaiga } from '@taiga-ui/core';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        canceledNavigationResolution: 'computed',
      }),
      withHashLocation(),
    ),
    provideTaiga({
      mode: 'dark',
    }),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
  ],
};
