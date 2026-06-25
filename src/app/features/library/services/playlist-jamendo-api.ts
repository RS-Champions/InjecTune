import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JamendoApiBase } from '@core/jamendo/jamendo-api-base';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { SearchTrack } from '@shared/track/interfaces/search-track';

@Injectable({ providedIn: 'root' })
export class PlaylistJamendoApi {
  private readonly http = inject(HttpClient);
  private readonly jamendoApi = inject(JamendoApiBase);

  /**
   * Searches Jamendo tracks by query string.
   * Called by PlaylistTrackSearch component.
   */
  searchTracks(query: string): Observable<SearchTrack[]> {
    return this.http
      .get<JamendoResponse<SearchTrack>>(this.jamendoApi.tracksUrl, {
        params: {
          ...this.jamendoApi.baseParams(),
          search: query,
          limit: '10',
          imagesize: '60',
        },
      })
      .pipe(map((res) => res.results));
  }
}
