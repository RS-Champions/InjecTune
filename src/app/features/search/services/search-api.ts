import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  readonly tracksResource = httpResource<JamendoResponse<SearchTrack>>(() => ({
    url: this.tracksUrl,
    params: this.tracksParams(this.query(), this.filters(), this.offset(), this.limit()),
  }));

  private tracksParams(query: string, filters: SearchFilters, offset: number, limit = 20) {
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
