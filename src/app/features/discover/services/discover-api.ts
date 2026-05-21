import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Track } from '../interfaces/track';

interface PopularTracksResponse {
  results: Track[];
}

@Injectable({
  providedIn: 'root',
})
export class DiscoverApi {
  private readonly popularTracksUrl = 'popular-tracks.json';
  public readonly popularTracksResource = httpResource<PopularTracksResponse>(() => this.popularTracksUrl);
}
