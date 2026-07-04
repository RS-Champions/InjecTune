import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig, withHashLocation } from '@angular/router';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { BackendAuthService } from '@core/auth/services/backend-auth-service';
import { provideTaiga } from '@taiga-ui/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AuthServiceAbstract, useClass: BackendAuthService },
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
