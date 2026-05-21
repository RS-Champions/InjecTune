import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackResponse } from '../interfaces/track';

@Injectable({
  providedIn: 'root',
})
export class DiscoverApi {
  private readonly popularTracksUrl = 'popular-tracks.json';
  private readonly releaseTracksUrl = 'release-tracks.json';

  public readonly popularTracksResource = httpResource<TrackResponse>(() => this.popularTracksUrl);
  public readonly releaseTracksResource = httpResource<TrackResponse>(() => this.releaseTracksUrl);
}
