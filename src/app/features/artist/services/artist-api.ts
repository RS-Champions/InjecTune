import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { ArtistAlbum } from '@features/artist/interfaces/artist.model';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Injectable({
  providedIn: 'root',
})
export class ArtistApi {
  private readonly http = inject(HttpClient);

  readonly albumsUrl = `${environment.jamendo.apiUrl}/artists/albums`;
  readonly albumsTracksUrl = `${environment.jamendo.apiUrl}/albums/tracks`;
  readonly tracksUrl = `${environment.jamendo.apiUrl}/tracks`;
  readonly clientId = environment.jamendo.clientId;

  albumsParams(artistId: string) {
    return {
      client_id: this.clientId,
      id: artistId,
      limit: 'all',
      imagesize: 300,
      format: 'json',
    };
  }

  tracksParams(artistId: string) {
    return {
      client_id: this.clientId,
      artist_id: artistId,
      limit: '3',
      order: 'popularity_total',
      include: 'stats',
      imagesize: 300,
      format: 'json',
    };
  }

  /**
   * Fetches track counts for all album IDs.
   * Splits into batches of 50 to respect Jamendo API limit.
   * Returns a Map<albumId, tracksCount>.
   */
  fetchAlbumTrackCounts(albumIds: string[]): Observable<Map<string, number>> {
    if (albumIds.length === 0) return of(new Map<string, number>());

    const BATCH_SIZE = 50;
    const batches = this.chunk(albumIds, BATCH_SIZE);

    const requests = batches.map((batch) =>
      this.http.get<JamendoResponse<ArtistAlbum>>(this.albumsTracksUrl, {
        params: {
          client_id: this.clientId,
          id: batch.join('+'),
          limit: 'all',
          format: 'json',
        },
      }),
    );

    return forkJoin(requests).pipe(
      map((responses: JamendoResponse<ArtistAlbum>[]) => {
        const countMap = new Map<string, number>();
        for (const response of responses) {
          for (const album of response.results) {
            countMap.set(album.id, album.tracks?.length ?? 0);
          }
        }
        return countMap;
      }),
    );
  }

  private chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let index = 0; index < array.length; index += size) {
      chunks.push(array.slice(index, index + size));
    }
    return chunks;
  }
}
