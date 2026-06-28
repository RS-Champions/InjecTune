import { Injectable, signal } from '@angular/core';

// TODO(auth): replace with real Supabase Auth session.
export const STUB_USER_ID = '00000000-0000-0000-0000-000000000001';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly authenticatedUserId = signal<string | null>(STUB_USER_ID);
}
