import { inject, Injectable } from '@angular/core';
import { LIBRARY_API_URL } from '@core/tokens/library.tokens';

// TODO(auth): replace STUB_USER_ID with real Supabase Auth session identity.
// User identity will travel via JWT header once auth is implemented

@Injectable({
  providedIn: 'root',
})
export class LibraryApiBase {
  private readonly apiUrl = inject(LIBRARY_API_URL);

  readonly playlistsUrl = `${this.apiUrl}/playlists`;
  readonly favoritesUrl = `${this.apiUrl}/favorites`;
}
