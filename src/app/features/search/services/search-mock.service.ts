import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SearchTrack } from '@features/search/interfaces/search-track';

export interface SearchResultPage {
  results: SearchTrack[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchMockService {
  private readonly mockUrl = 'search-tracks.mock.json';

  search(query: string, abortSignal?: AbortSignal, offset = 0, limit = 8): Observable<SearchResultPage> {
    if (query === '') {
      const emptySearchResult = { results: [] as SearchTrack[], totalCount: 0 };

      return of(emptySearchResult).pipe(delay(500));
    }

    return from(this.fetchTracks(abortSignal)).pipe(
      map((tracks) => this.filter.bind(this)(tracks, query)),
      map((tracks) => ({
        results: tracks.slice(offset, offset + limit),
        totalCount: tracks.length,
      })),
      delay(500),
    );
  }

  private async fetchTracks(abortSignal?: AbortSignal): Promise<SearchTrack[]> {
    const response = await fetch(this.mockUrl, { signal: abortSignal });
    if (!response.ok) {
      throw new Error(`Failed to load mock data: ${String(response.status)}`);
    }
    return response.json() as Promise<SearchTrack[]>;
  }

  private filter(tracks: SearchTrack[], query: string): SearchTrack[] {
    if (!query.trim()) {
      return tracks;
    }

    const q = query.toLowerCase();

    return tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(q) ||
        track.artist_name.toLowerCase().includes(q) ||
        track.album_name?.toLowerCase().includes(q),
    );
  }
}
