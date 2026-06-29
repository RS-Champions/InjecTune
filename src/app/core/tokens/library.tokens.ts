import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment';

export const LIBRARY_API_URL = new InjectionToken<string>('LIBRARY_API_URL', {
  providedIn: 'root',
  factory: () => environment.library.apiUrl,
});
