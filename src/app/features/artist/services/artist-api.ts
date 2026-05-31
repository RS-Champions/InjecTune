import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistApi {
  readonly albumsUrl = `${environment.jamendo.apiUrl}/artists/albums`;
  readonly tracksUrl = `${environment.jamendo.apiUrl}/tracks`;
  readonly clientId = environment.jamendo.clientId;

  albumsParams(artistId: string) {
    return {
      client_id: this.clientId,
      id: artistId,
      limit: 'all',
      imagesize: 300,
      format: 'json',
    };
  }

  tracksParams(artistId: string) {
    return {
      client_id: this.clientId,
      artist_id: artistId,
      limit: '3',
      order: 'popularity_total',
      include: 'stats',
      imagesize: 300,
      format: 'json',
    };
  }
}
