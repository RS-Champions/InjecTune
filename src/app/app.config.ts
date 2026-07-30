import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
  withHashLocation,
  withPreloading,
} from '@angular/router';
import { authInterceptor } from '@core/auth/interceptors/auth-interceptor';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { BackendAuthService } from '@core/auth/services/backend-auth-service';
import { jamendoRetryInterceptor } from '@core/jamendo/jamendo-retry-interceptor';
import { wakeUpInterceptor } from '@core/http/interceptors/wake-up-interceptor';
import { SelectivePreloadingStrategy } from '@core/router/selective-preloading-strategy';
import { provideTaiga } from '@taiga-ui/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([wakeUpInterceptor, authInterceptor, jamendoRetryInterceptor])),
    { provide: AuthServiceAbstract, useClass: BackendAuthService },
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(SelectivePreloadingStrategy),
      withComponentInputBinding(),
      withRouterConfig({
        canceledNavigationResolution: 'computed',
      }),
      withHashLocation(),
    ),
    provideTaiga({
      mode: 'dark',
    }),
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
  ],
};
