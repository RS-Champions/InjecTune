import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root',
})
export class DiscoverApi {
  private readonly popularTracksUrl = 'popular-tracks.json';
  public readonly popularTracksResource = httpResource<Track[]>(() => this.popularTracksUrl);
}
