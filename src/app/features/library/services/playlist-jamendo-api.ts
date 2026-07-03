import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { chunk } from '@shared/utils/array';
import {
  EnrichedPlaylistTrack,
  EnrichedRecentlyPlayedTrack,
  PlaylistTrack,
  RecentlyPlayedTrack,
} from '../interfaces/library-api.model';

/** Minimal shape any enrichable row must satisfy: a Jamendo track id + its source. */
interface SourcedRow {
  track_id: string;
  source: 'jamendo' | 'own';
}

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
    return this.enrichBySource(playlistTracks);
  }

  /**
   * Takes the raw recently_played rows from the backend and enriches them
   * with track metadata fetched from Jamendo in batches.
   *
   * Items with source 'own' are skipped — handled separately in Issue #17.
   * The result preserves the original `played_at` ordering from the backend.
   */
  enrichRecentlyPlayed(items: RecentlyPlayedTrack[]): Observable<EnrichedRecentlyPlayedTrack[]> {
    return this.enrichBySource(items);
  }

  /**
   * Shared batch-enrichment core. Filters to 'jamendo' source rows, fetches
   * metadata in chunks of JAMENDO_BATCH_SIZE, then merges each row with its
   * matching SearchTrack metadata. Spread order is critical: DB row fields
   * (id, position/played_at, source, track_id) must win over Jamendo's
   * metadata fields on any key collision (e.g. Jamendo's own numeric `id`).
   */
  private enrichBySource<T extends SourcedRow>(rows: T[]): Observable<(T & SearchTrack)[]> {
    const jamendoRows = rows.filter((r) => r.source === 'jamendo');

    if (jamendoRows.length === 0) return of([]);

    const ids = jamendoRows.map((r) => r.track_id);
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
        const metaMap = new Map<string, SearchTrack>();
        for (const response of responses) {
          for (const track of response.results) {
            metaMap.set(track.id, track);
          }
        }

        const enrichedRows: (T & SearchTrack)[] = [];
        for (const row of jamendoRows) {
          const meta = metaMap.get(row.track_id);
          if (meta) {
            enrichedRows.push({ ...meta, ...row });
          }
        }
        return enrichedRows;
      }),
    );
  }
}
