import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment';

export const JAMENDO_API_URL = new InjectionToken<string>('JAMENDO_API_URL', {
  providedIn: 'root',
  factory: () => environment.jamendo.apiUrl,
});

export const JAMENDO_CLIENT_ID = new InjectionToken('JAMENDO_CLIENT_ID', {
  factory: () => environment.jamendo.clientId,
});
