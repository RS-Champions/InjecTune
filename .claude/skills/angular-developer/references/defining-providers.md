# Defining Dependency Providers

Angular offers automatic and manual ways to provide dependencies to its Dependency Injection (DI) system.

## Automatic Provision

The most common way to provide a service is using `providedIn: 'root'` on an `@Injectable()`.

### InjectionToken

Use `InjectionToken` for non-class dependencies (configuration objects, functions, primitives). An `InjectionToken` can also be automatically provided.

```ts
<<<<<<< chore/setup-project
import { InjectionToken } from '@angular/core';
=======
import {InjectionToken} from '@angular/core';
>>>>>>> main

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
<<<<<<< chore/setup-project
  factory: () => ({ apiUrl: 'https://api.example.com' }),
=======
  factory: () => ({apiUrl: 'https://api.example.com'}),
>>>>>>> main
});
```

## Manual Provision

You use the `providers` array when a service lacks `providedIn`, when you want a new instance for a specific component, or when configuring runtime values.

```ts
@Component({
  providers: [
    // Shorthand for { provide: LocalService, useClass: LocalService }
    LocalService,

    // useClass: Swap implementations
<<<<<<< chore/setup-project
    { provide: Logger, useClass: BetterLogger },

    // useValue: Provide static values
    { provide: API_URL_TOKEN, useValue: 'https://api.example.com' },
=======
    {provide: Logger, useClass: BetterLogger},

    // useValue: Provide static values
    {provide: API_URL_TOKEN, useValue: 'https://api.example.com'},
>>>>>>> main

    // useFactory: Generate value dynamically
    {
      provide: ApiClient,
      useFactory: (http = inject(HttpClient)) => new ApiClient(http),
    },

    // useExisting: Create an alias
<<<<<<< chore/setup-project
    { provide: OldLogger, useExisting: NewLogger },

    // multi: Provide multiple values for the same token as an array
    { provide: INTERCEPTOR_TOKEN, useClass: AuthInterceptor, multi: true },
=======
    {provide: OldLogger, useExisting: NewLogger},

    // multi: Provide multiple values for the same token as an array
    {provide: INTERCEPTOR_TOKEN, useClass: AuthInterceptor, multi: true},
>>>>>>> main
  ],
})
export class Example {}
```

## Scopes of Providers

- **Application Bootstrap**: Global singletons. Use for HTTP clients, logging, or app-wide config.
- **Component/Directive**: Isolated instances. Use for component-specific state or forms. Services are destroyed when the component is destroyed.
- **Route**: Feature-specific services loaded only with specific routes.

## Library Pattern: `provide*` functions

Library authors should export functions that return provider arrays to encapsulate configuration:

```ts
export function provideAnalytics(config: AnalyticsConfig): Provider[] {
<<<<<<< chore/setup-project
  return [{ provide: ANALYTICS_CONFIG, useValue: config }, AnalyticsService];
=======
  return [{provide: ANALYTICS_CONFIG, useValue: config}, AnalyticsService];
>>>>>>> main
}
```
