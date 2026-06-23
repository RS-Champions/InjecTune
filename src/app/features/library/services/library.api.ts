import { inject, Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { LibraryApiBase } from './library-api-base';
import { FavoriteItem, Playlist, PlaylistDetails } from '../interfaces/library-api.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryApi {
  private readonly base = inject(LibraryApiBase);

  // ── Playlists ──────────────────────────────────────────────────────────────

  /**
   * Fetches all playlists for the current user.
   * Stays active for the lifetime of the injected service.
   */
  readonly playlistsResource = httpResource<Playlist[]>(() => ({
    url: this.base.playlistsUrl,
  }));

  /**
   * Returns a resource for a single playlist with its tracks.
   * Pass a signal holding the playlist id — the resource is disabled
   * while the signal is null, and re-fetches automatically when it changes.
   *
   * Usage (in a component):
   *   readonly selectedId = signal<string | null>(null);
   *   readonly detailsResource = this.libraryApi.playlistDetailsResource(this.selectedId);
   */
  playlistDetailsResource(playlistId: Signal<string | null>): HttpResourceRef<PlaylistDetails | undefined> {
    return httpResource<PlaylistDetails>(() => {
      const id = playlistId();

      if (!id) return;

      return { url: `${this.base.playlistsUrl}/${id}` };
    });
  }

  // ── Favorites ──────────────────────────────────────────────────────────────

  /**
   * Fetches all favorites for the current user.
   */
  readonly favoritesResource = httpResource<FavoriteItem[]>(() => ({
    url: this.base.favoritesUrl,
  }));
}
