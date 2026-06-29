import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { chunk } from '@shared/utils/array';
import { EnrichedPlaylistTrack, PlaylistTrack } from '../interfaces/library-api.model';

@Injectable({ providedIn: 'root' })
export class PlaylistJamendoApi {
  private readonly http = inject(HttpClient);
  private readonly jamendoApi = inject(JamendoApiBase);

  /**
   * Searches Jamendo tracks by query string.
   * Called by PlaylistTrackSearch component.
   */
  searchTracks(query: string): Observable<SearchTrack[]> {
    return this.http
      .get<JamendoResponse<SearchTrack>>(this.jamendoApi.tracksUrl, {
        params: {
          ...this.jamendoApi.baseParams(),
          search: query,
          limit: '10',
          imagesize: '60',
        },
      })
      .pipe(map((response) => response.results));
  }

  /**
   * Takes the raw playlist_tracks rows from the backend and enriches them
   * with track metadata fetched from Jamendo in batches.
   *
   * Tracks with source 'own' are skipped — handled separately in Issue #17.
   * The result preserves the original `position` order from the backend.
   */
  enrichTracks(playlistTracks: PlaylistTrack[]): Observable<EnrichedPlaylistTrack[]> {
    const jamendoTracks = playlistTracks.filter((t) => t.source === 'jamendo');

    if (jamendoTracks.length === 0) return of([]);

    const ids = jamendoTracks.map((t) => t.track_id);
    const batches = chunk(ids, this.jamendoApi.JAMENDO_BATCH_SIZE);

    const requests = batches.map((batch) =>
      this.http.get<JamendoResponse<SearchTrack>>(this.jamendoApi.tracksUrl, {
        params: {
          ...this.jamendoApi.baseParams(),
          id: batch.join('+'),
          limit: 'all',
          imagesize: '200',
        },
      }),
    );

    return forkJoin(requests).pipe(
      map((responses: JamendoResponse<SearchTrack>[]) => {
        // Build a lookup map: jamendo track_id → metadata
        const metaMap = new Map<string, SearchTrack>();
        for (const response of responses) {
          for (const track of response.results) {
            metaMap.set(track.id, track);
          }
        }

        // Merge in position order, skipping any IDs Jamendo didn't return
        const enrichedPlaylistTracks: EnrichedPlaylistTrack[] = [];
        for (const playlistTrack of jamendoTracks) {
          const meta = metaMap.get(playlistTrack.track_id);
          if (meta) {
            enrichedPlaylistTracks.push({ ...playlistTrack, ...meta });
          }
        }
        return enrichedPlaylistTracks;
      }),
    );
  }
}
