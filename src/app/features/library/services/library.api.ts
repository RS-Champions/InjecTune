import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import {
  AddTrackDto,
  CreatePlaylistDto,
  FavoriteItem,
  Playlist,
  PlaylistDetails,
  PlaylistTrack,
  UpdatePlaylistDto,
} from '../interfaces/library-api.model';

// TODO(auth): replace STUB_USER_ID with real Supabase Auth session identity.
@Injectable({
  providedIn: 'root',
})
export class LibraryApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = inject(LIBRARY_API_URL);
  private readonly playlistsUrl = `${this.apiUrl}/playlists`;
  private readonly favoritesUrl = `${this.apiUrl}/favorites`;

  readonly playlistsResource = httpResource<Playlist[]>(() => ({
    url: this.playlistsUrl,
  }));

  playlistDetailsResource(playlistId: Signal<string | null>): HttpResourceRef<PlaylistDetails | undefined> {
    return httpResource<PlaylistDetails>(() => {
      const id = playlistId();

      if (!id) return;

      return { url: `${this.playlistsUrl}/${id}` };
    });
  }

  readonly favoritesResource = httpResource<FavoriteItem[]>(() => ({
    url: this.favoritesUrl,
  }));

  createPlaylist(dto: CreatePlaylistDto): Observable<Playlist> {
    return this.http.post<Playlist>(this.playlistsUrl, dto);
  }

  updatePlaylist(id: string, dto: UpdatePlaylistDto): Observable<Playlist> {
    return this.http.patch<Playlist>(`${this.playlistsUrl}/${id}`, dto);
  }

  deletePlaylist(id: string): Observable<void> {
    return this.http.delete(`${this.playlistsUrl}/${id}`).pipe(map(() => void 0));
  }

  addTrackToPlaylist(playlistId: string, dto: AddTrackDto): Observable<PlaylistTrack> {
    return this.http.post<PlaylistTrack>(`${this.playlistsUrl}/${playlistId}/tracks`, dto);
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string, source: 'jamendo' | 'own' = 'jamendo'): Observable<void> {
    return this.http
      .delete(`${this.playlistsUrl}/${playlistId}/tracks/${trackId}`, {
        params: { source },
      })
      .pipe(map(() => void 0));
  }

  addFavorite(trackId: string): Observable<FavoriteItem> {
    return this.http.post<FavoriteItem>(`${this.favoritesUrl}/${trackId}`, {});
  }

  removeFavorite(trackId: string): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${trackId}`);
  }
}
