import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { SearchTrack } from '@features/search/interfaces/search-track';

@Injectable({
  providedIn: 'root',
})
export class SearchApi {
  private readonly tracksUrl = signal('search-tracks.mock.json');

  readonly tracksResource = httpResource<SearchTrack[]>(() => this.tracksUrl());
}
