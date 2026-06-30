import { provideTaiga } from '@taiga-ui/core';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/services/auth.service';
import { MockAuthService } from '@core/auth/services/mock-auth-service/mock-auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AuthService, useClass: MockAuthService },
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
