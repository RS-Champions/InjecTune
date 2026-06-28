import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LibraryApiBase } from './library-api-base';
import {
  AddTrackDto,
  CreatePlaylistDto,
  FavoriteItem,
  Playlist,
  PlaylistDetails,
  PlaylistTrack,
  UpdatePlaylistDto,
} from '../interfaces/library-api.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryApi {
  private readonly base = inject(LibraryApiBase);
  private readonly http = inject(HttpClient);

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

  createPlaylist(dto: CreatePlaylistDto): Observable<Playlist> {
    return this.http.post<Playlist>(this.base.playlistsUrl, dto);
  }

  updatePlaylist(id: string, dto: UpdatePlaylistDto): Observable<Playlist> {
    return this.http.patch<Playlist>(`${this.base.playlistsUrl}/${id}`, dto);
  }

  deletePlaylist(id: string): Observable<void> {
    return this.http.delete(`${this.base.playlistsUrl}/${id}`).pipe(map(() => void 0));
  }

  addTrackToPlaylist(playlistId: string, dto: AddTrackDto): Observable<PlaylistTrack> {
    return this.http.post<PlaylistTrack>(`${this.base.playlistsUrl}/${playlistId}/tracks`, dto);
  }

  addFavorite(trackId: string): Observable<FavoriteItem> {
    return this.http.post<FavoriteItem>(`${this.base.favoritesUrl}/${trackId}`, {});
  }

  removeFavorite(trackId: string): Observable<void> {
    return this.http.delete(`${this.base.favoritesUrl}/${trackId}`).pipe(map(() => void 0));
  }
}
