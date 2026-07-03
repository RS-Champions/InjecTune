import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Injectable({
  providedIn: 'root',
})
export class DiscoverApi {
  private readonly popularTracksUrl = 'popular-tracks.json';
  private readonly releaseTracksUrl = 'release-tracks.json';

  public readonly popularTracksResource = httpResource<JamendoResponse<BaseTrack>>(() => this.popularTracksUrl);
  public readonly releaseTracksResource = httpResource<JamendoResponse<BaseTrack>>(() => this.releaseTracksUrl);
}
