import { computed, inject, Injectable, signal } from '@angular/core';

import { SearchFilters, SortBy } from '@features/search/interfaces/search-filters';
import { SearchResultPage } from '@features/search/interfaces/search-result-page';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchApi } from './search-api';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  readonly api = inject(SearchApi);

  readonly query = signal('');
  readonly filters = signal<SearchFilters>({});

  readonly offset = signal(0);
  readonly limit = signal(8);

  readonly currentTrack = signal<SearchTrack | null>(null);

  readonly searchResult = computed<SearchResultPage>(() => {
    if (!this.query() && !this.filters().genres?.length) {
      return { searchedTracks: [], totalCount: 0 };
    }

    const query = this.query() ? this.query().trim().toLowerCase() : '';
    const tracks = this.api.tracksResource.value()?.results ?? [];
    const sortedFilteredTracks = this.sortTracks(
      this.filterTracks(tracks, query, this.filters()),
      this.filters().sortBy ?? 'relevance',
    );

    const offset = this.offset();
    const limit = this.limit();

    return {
      searchedTracks: sortedFilteredTracks.slice(offset, offset + limit),
      totalCount: sortedFilteredTracks.length,
    };
  });

  private filterTracks(tracks: SearchTrack[], pureQuery: string, filters: SearchFilters): SearchTrack[] {
    let processedTracks = [...tracks];
    const { durationMin, durationMax } = filters;

    if (pureQuery) {
      processedTracks = processedTracks.filter(
        (track) =>
          track.name.toLowerCase().includes(pureQuery) ||
          track.artist_name.toLowerCase().includes(pureQuery) ||
          track.album_name?.toLowerCase().includes(pureQuery),
      );
    }

    if (filters.genres?.length) {
      const selectedGenres = new Set(filters.genres.map((g) => g.toLowerCase()));
      processedTracks = processedTracks.filter((track) => {
        const trackGenres = track.musicinfo?.tags?.genres?.map((g) => g.toLowerCase());
        return trackGenres?.some((genre) => selectedGenres.has(genre));
      });
    }

    if (durationMin !== undefined) {
      processedTracks = processedTracks.filter((track) => Number(track.duration) >= durationMin);
    }

    if (durationMax !== undefined) {
      processedTracks = processedTracks.filter((track) => Number(track.duration) <= durationMax);
    }

    return processedTracks;
  }

  private sortTracks(tracks: SearchTrack[], sortBy: SortBy): SearchTrack[] {
    switch (sortBy) {
      case 'popularity': {
        return tracks.toSorted((a, b) => b.stats.rate_listened_total - a.stats.rate_listened_total);
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
