import { httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';

import { SearchFilters } from '@features/search/interfaces/search-filters';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Injectable({
  providedIn: 'root',
})
export class SearchApi {
  private readonly jamendoApi = inject(JamendoApiBase);
  readonly tracksUrl = this.jamendoApi.tracksUrl;

  readonly query = signal('');
  readonly filters = signal<SearchFilters>({});
  readonly offset = signal(0);
  readonly limit = signal(20);

  readonly allTracksResource = httpResource<JamendoResponse<SearchTrack>>(() => ({
    url: this.tracksUrl,
    params: this.tracksParams(this.query(), this.filters(), 0, 'all'),
  }));

  readonly tracksResource = httpResource<JamendoResponse<SearchTrack>>(() => ({
    url: this.tracksUrl,
    params: this.tracksParams(this.query(), this.filters(), this.offset(), this.limit()),
  }));

  readonly tracks = signal<SearchTrack[]>([]);

  readonly totalAvailable = computed(() => Math.min(this.allTracksResource.value()?.headers.results_count ?? 0, 200));

  constructor() {
    // reset on query/filters change
    effect(() => {
      this.query();
      this.filters();
      this.tracks.set([]);
      this.offset.set(0);
    });

    // append resolved page
    effect(() => {
      const results = this.tracksResource.value()?.results;
      if (results?.length && this.tracksResource.status() === 'resolved') {
        this.tracks.update((current) => [...current, ...results]);
      }
    });
  }

  readonly hasMore = computed(() => {
    if (this.allTracksResource.status() !== 'resolved') return false;
    const count = this.allTracksResource.value()?.headers.results_count ?? 0;
    return this.tracks().length < Math.min(count, 200);
  });

  private tracksParams(query: string, filters: SearchFilters, offset: number, limit: number | 'all') {
    // Jamendo accepts limit='all' to return up to its server-side cap (200)
    const order = filters.sortBy ?? 'relevance';
    const durationbetween =
      filters.durationMin !== undefined && filters.durationMax !== undefined
        ? `${filters.durationMin.toString()}_${filters.durationMax.toString()}`
        : undefined;
    const fuzzytags = filters.genres?.join('+') ?? undefined;

    return {
      ...this.jamendoApi.baseParams(),
      ...(query && { search: query }),
      ...(fuzzytags && { fuzzytags }),
      ...(durationbetween && { durationbetween }),
      order,
      offset,
      limit,
      include: 'stats',
      imagesize: 300,
      audioformat: 'mp31',
    };
  }
}
