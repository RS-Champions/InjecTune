import { computed, inject, Injectable, signal } from '@angular/core';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchApi } from './search-api';
import { SearchResultPage } from '../interfaces/search-result-page';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  readonly api = inject(SearchApi);

  readonly query = signal('');

  readonly offset = signal(0);
  readonly limit = signal(8);

  readonly currentTrack = signal<SearchTrack | null>(null);

  readonly searchResult = computed<SearchResultPage>(() => {
    const tracks = this.api.tracksResource.value() ?? [];
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return { searchedTracks: [], totalCount: 0 };
    }

    const filteredTracks = tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.artist_name.toLowerCase().includes(query) ||
        track.album_name?.toLowerCase().includes(query),
    );

    const offset = this.offset();
    const limit = this.limit();

    return {
      searchedTracks: filteredTracks.slice(offset, offset + limit),
      totalCount: filteredTracks.length,
    };
  });
}
