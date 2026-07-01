import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import {
  AddRecentlyPlayedDto,
  AddTrackDto,
  CreatePlaylistDto,
  FavoriteItem,
  Playlist,
  PlaylistDetails,
  PlaylistTrack,
  RecentlyPlayedFilterDto,
  RecentlyPlayedTrack,
  UpdatePlaylistDto,
} from '../interfaces/library-api.model';
import { ReorderTracksDto } from '../interfaces/library.model';

// TODO(auth): replace STUB_USER_ID with real Supabase Auth session identity.
@Injectable({
  providedIn: 'root',
})
export class LibraryApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = inject(LIBRARY_API_URL);
  private readonly playlistsUrl = `${this.apiUrl}/playlists`;
  private readonly favoritesUrl = `${this.apiUrl}/favorites`;
  private readonly recentlyPlayedUrl = `${this.apiUrl}/recently-played`;

  playlistsResource(): HttpResourceRef<Playlist[]> {
    return httpResource<Playlist[]>(
      () => ({
        url: this.playlistsUrl,
      }),
      { defaultValue: [] },
    );
  }

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

  /**
   * filter is a Signal so the resource reactively reloads whenever the
   * caller's filter state changes (e.g. a date range picked for Issue #15)
   * — no manual .reload() call needed when the filter itself changes.
   * Pass signal(() => ({})) for an unfiltered, always-current view.
   */
  recentlyPlayedResource(filter: Signal<RecentlyPlayedFilterDto>): HttpResourceRef<RecentlyPlayedTrack[]> {
    return httpResource<RecentlyPlayedTrack[]>(
      () => ({
        url: this.recentlyPlayedUrl,
        params: { ...filter() },
      }),
      { defaultValue: [] },
    );
  }

  createPlaylist(dto: CreatePlaylistDto): Observable<Playlist> {
    return this.http.post<Playlist>(this.playlistsUrl, dto);
  }

  updatePlaylist(id: string, dto: UpdatePlaylistDto): Observable<Playlist> {
    return this.http.patch<Playlist>(`${this.playlistsUrl}/${id}`, dto);
  }

  deletePlaylist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.playlistsUrl}/${id}`);
  }

  addTrackToPlaylist(playlistId: string, dto: AddTrackDto): Observable<PlaylistTrack> {
    return this.http.post<PlaylistTrack>(`${this.playlistsUrl}/${playlistId}/tracks`, dto);
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string, source: 'jamendo' | 'own' = 'jamendo'): Observable<void> {
    return this.http.delete<void>(`${this.playlistsUrl}/${playlistId}/tracks/${trackId}`, {
      params: { source },
    });
  }

  reorderTracks(playlistId: string, dto: ReorderTracksDto): Observable<PlaylistDetails> {
    return this.http.patch<PlaylistDetails>(`${this.playlistsUrl}/${playlistId}/reorder`, dto);
  }

  addFavorite(trackId: string): Observable<FavoriteItem> {
    return this.http.post<FavoriteItem>(`${this.favoritesUrl}/${trackId}`, {});
  }

  removeFavorite(trackId: string): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${trackId}`);
  }

  addRecentlyPlayed(dto: AddRecentlyPlayedDto): Observable<RecentlyPlayedTrack> {
    return this.http.post<RecentlyPlayedTrack>(this.recentlyPlayedUrl, dto);
  }
}
