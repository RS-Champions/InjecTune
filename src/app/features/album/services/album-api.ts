import { inject, Injectable } from '@angular/core';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';

@Injectable({
  providedIn: 'root',
})
export class AlbumApi {
  private readonly jamendoApi = inject(JamendoApiBase);
  readonly albumsUrl = this.jamendoApi.albumsUrl;
  readonly tracksUrl = this.jamendoApi.tracksUrl;

  albumsParams(albumId: string) {
    return { ...this.jamendoApi.baseParams(), id: albumId, limit: 'all', imagesize: 600 };
  }

  tracksParams(albumId: string) {
    return {
      ...this.jamendoApi.baseParams(),
      album_id: albumId,
      limit: 'all',
      include: 'stats',
      imagesize: 300,
      audioformat: 'mp31',
    };
  }
}
