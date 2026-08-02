import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';

@Injectable({
  providedIn: 'root',
})
export class DiscoverApi {
  private readonly jamendoApi = inject(JamendoApiBase);

  public readonly popularTracksResource = httpResource<JamendoResponse<BaseTrack>>(() => ({
    url: this.jamendoApi.tracksUrl,
    params: this.discoverParams('popularity_total'),
  }));

  public readonly releaseTracksResource = httpResource<JamendoResponse<BaseTrack>>(() => ({
    url: this.jamendoApi.tracksUrl,
    params: this.discoverParams('releasedate_desc'),
  }));

  public discoverParams(order: string) {
    return { ...this.jamendoApi.baseParams(), limit: '10', imagesize: 600, order };
  }
}
