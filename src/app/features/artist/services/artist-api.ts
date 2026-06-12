import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';
import { ArtistAlbum } from '@features/artist/interfaces/artist.model';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Injectable({
  providedIn: 'root',
})
export class ArtistApi {
  private readonly http = inject(HttpClient);
  private readonly jamendoApi = inject(JamendoApiBase);
  readonly artistsAlbumsUrl = this.jamendoApi.artistsAlbumsUrl;
  readonly albumsTracksUrl = this.jamendoApi.albumsTracksUrl;
  readonly tracksUrl = this.jamendoApi.tracksUrl;

  albumsParams(artistId: string) {
    return { ...this.jamendoApi.baseParams(), id: artistId, limit: 'all', imagesize: 300 };
  }

  tracksParams(artistId: string) {
    return {
      ...this.jamendoApi.baseParams(),
      artist_id: artistId,
      limit: '3',
      order: 'popularity_total',
      include: 'stats',
      imagesize: 300,
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
        params: { ...this.jamendoApi.baseParams(), id: batch.join('+'), limit: 'all' },
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
