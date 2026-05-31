import { httpResource } from '@angular/common/http';
import { computed, Injectable, Signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Artist } from '@features/artist/interfaces/artist.model';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Injectable({
  providedIn: 'root',
})
export class ArtistApi {
  private readonly baseUrl = `${environment.jamendo.apiUrl}/artists/albums`;

  createArtistResource(artistId: Signal<string>) {
    const resource = httpResource<JamendoResponse<Artist>>(() => ({
      url: this.baseUrl,
      params: {
        client_id: environment.jamendo.clientId,
        id: artistId(),
        limit: 'all',
        imagesize: 300,
        format: 'jsonpretty',
      },
    }));

    const artist = computed<Artist | null>(() => {
      const response = resource.value();

      if (!response?.results.length) return null;

      return response.results[0];
    });

    return { resource, artist };
  }
}
