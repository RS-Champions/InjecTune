import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { SearchTrack } from '@features/search/interfaces/search-track';

interface SearchApiResponse {
  headers: {
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
    next?: string;
  };
  results: SearchTrack[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchApi {
  private readonly tracksUrl = signal('search-tracks.json');

  readonly tracksResource = httpResource<SearchApiResponse>(() => this.tracksUrl());
}
