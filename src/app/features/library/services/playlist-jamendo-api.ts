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
import { toSearchTrack } from '../interfaces/own-track.mapper';
import { LibraryApi } from './library.api';

/** Minimal shape any enrichable row must satisfy: a track id + its source. */
interface SourcedRow {
  track_id: string;
  source: 'jamendo' | 'own';
}

@Injectable({ providedIn: 'root' })
export class PlaylistJamendoApi {
  private readonly http = inject(HttpClient);
  private readonly jamendoApi = inject(JamendoApiBase);
  private readonly libraryApi = inject(LibraryApi);

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
   * with track metadata — Jamendo tracks fetched from Jamendo, own tracks
   * fetched from GET /tracks. The result preserves the original `position`
   * order from the backend regardless of which source each row came from.
   */
  enrichTracks(playlistTracks: PlaylistTrack[]): Observable<EnrichedPlaylistTrack[]> {
    return this.enrichBySource(playlistTracks);
  }

  /**
   * Takes the raw recently_played rows from the backend and enriches them
   * with track metadata — Jamendo tracks fetched from Jamendo, own tracks
   * fetched from GET /tracks. The result preserves the original `played_at`
   * ordering from the backend regardless of which source each row came from.
   */
  enrichRecentlyPlayed(items: RecentlyPlayedTrack[]): Observable<EnrichedRecentlyPlayedTrack[]> {
    return this.enrichBySource(items);
  }

  /**
   * Shared enrichment core. Builds a metadata lookup map per source
   * (Jamendo batch-fetched, own tracks fetched in one GET /tracks call),
   * then walks the *original* `rows` array once, in its original order,
   * looking up each row's metadata regardless of source.
   *
   * Building per-source maps and then re-walking `rows` — rather than
   * enriching each source's subset and concatenating the two result
   * arrays — is what keeps the original ordering intact when a playlist
   * or history mixes jamendo and own tracks; concatenating would group
   * all Jamendo tracks before all own tracks regardless of their real
   * position/played_at order.
   *
   * Spread order is critical: DB row fields (id, position/played_at,
   * source, track_id) must win over metadata fields on any key collision
   * (e.g. Jamendo's own numeric `id`).
   */
  private enrichBySource<T extends SourcedRow>(rows: T[]): Observable<(T & SearchTrack)[]> {
    if (rows.length === 0) return of([]);

    const jamendoRows = rows.filter((r) => r.source === 'jamendo');
    const ownRows = rows.filter((r) => r.source === 'own');

    return forkJoin({
      jamendoMeta: this.fetchJamendoMetaMap(jamendoRows),
      ownMeta: this.fetchOwnMetaMap(ownRows),
    }).pipe(
      map(({ jamendoMeta, ownMeta }) => {
        const enrichedRows: (T & SearchTrack)[] = [];
        for (const row of rows) {
          const meta = row.source === 'own' ? ownMeta.get(row.track_id) : jamendoMeta.get(row.track_id);
          if (meta) {
            enrichedRows.push({ ...meta, ...row });
          }
        }
        return enrichedRows;
      }),
    );
  }

  private fetchJamendoMetaMap(jamendoRows: SourcedRow[]): Observable<Map<string, SearchTrack>> {
    if (jamendoRows.length === 0) return of(new Map<string, SearchTrack>());

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
        return metaMap;
      }),
    );
  }

  /**
   * Fetches the current user's full own-tracks catalog and maps each to
   * SearchTrack. Unlike the Jamendo path, this doesn't filter server-side
   * by the specific ids we need — GET /tracks already scopes to the current
   * user and own-track catalogs are expected to be small for this project,
   * so fetching everything and looking up locally is simpler than adding
   * an id-filter query param. Revisit if own-track catalogs grow large.
   */
  private fetchOwnMetaMap(ownRows: SourcedRow[]): Observable<Map<string, SearchTrack>> {
    if (ownRows.length === 0) return of(new Map<string, SearchTrack>());

    return this.libraryApi.ownTracks().pipe(
      map((tracks) => {
        const metaMap = new Map<string, SearchTrack>();
        for (const track of tracks) {
          metaMap.set(track.id, toSearchTrack(track));
        }
        return metaMap;
      }),
    );
  }
}
