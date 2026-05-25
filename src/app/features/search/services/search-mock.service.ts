import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchFilters, SortBy } from '@features/search/interfaces/search-filters';

export interface SearchResultPage {
  results: SearchTrack[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchMockService {
  private readonly mockUrl = 'search-tracks.mock.json';

  search(
    query: string,
    abortSignal?: AbortSignal,
    filters: SearchFilters = {},
    offset = 0,
    limit = 8,
  ): Observable<SearchResultPage> {
    if (query === '' && Object.keys(filters).length === 0) {
      const emptySearchResult = { results: [] as SearchTrack[], totalCount: 0 };

      return of(emptySearchResult).pipe(delay(500));
    }

    return from(this.fetchTracks(abortSignal)).pipe(
      map((tracks) => this.filter.bind(this)(tracks, query, filters)),
      map((tracks) => this.sort(tracks, filters.sortBy ?? 'relevance')),
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

  private filter(tracks: SearchTrack[], query: string, filters: SearchFilters): SearchTrack[] {
    let result = [...tracks];
    const { durationMin, durationMax } = filters;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (track) =>
          track.name.toLowerCase().includes(q) ||
          track.artist_name.toLowerCase().includes(q) ||
          track.album_name?.toLowerCase().includes(q),
      );
    }

    if (filters.genres?.length) {
      const selectedGenres = new Set(filters.genres.map((g) => g.toLowerCase()));
      result = result.filter((track) => {
        const trackGenres = track.musicinfo?.tags?.genres?.map((g) => g.toLowerCase());
        return trackGenres?.some((genre) => selectedGenres.has(genre));
      });
    }

    if (durationMin !== undefined) {
      result = result.filter((track) => track.duration >= durationMin);
    }

    if (durationMax !== undefined) {
      result = result.filter((track) => track.duration <= durationMax);
    }

    return result;
  }

  private sort(tracks: SearchTrack[], sortBy: SortBy): SearchTrack[] {
    switch (sortBy) {
      case 'popularity': {
        return tracks.toSorted((a, b) => b.stats.listens_total - a.stats.listens_total);
      }
      case 'releasedate_desc': {
        return tracks.toSorted((a, b) => new Date(b.releasedate).getTime() - new Date(a.releasedate).getTime());
      }
      case 'name': {
        return tracks.toSorted((a, b) => a.name.localeCompare(b.name));
      }
      default: {
        return tracks;
      }
    }
  }
}
