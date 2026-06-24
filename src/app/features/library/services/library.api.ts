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

  readonly playlistsResource = httpResource<Playlist[]>(() => ({
    url: this.base.playlistsUrl,
  }));

  playlistDetailsResource(playlistId: Signal<string | null>): HttpResourceRef<PlaylistDetails | undefined> {
    return httpResource<PlaylistDetails>(() => {
      const id = playlistId();

      if (!id) return;

      return { url: `${this.base.playlistsUrl}/${id}` };
    });
  }

  readonly favoritesResource = httpResource<FavoriteItem[]>(() => ({
    url: this.base.favoritesUrl,
  }));
}
