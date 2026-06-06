import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumApi {
  private readonly clientId = environment.jamendo.clientId;
  readonly albumsUrl = `${environment.jamendo.apiUrl}/albums`;
  readonly tracksUrl = `${environment.jamendo.apiUrl}/tracks`;

  albumsParams(albumId: string) {
    return {
      client_id: this.clientId,
      id: albumId,
      limit: 'all',
      imagesize: 600,
      format: 'json',
    };
  }

  tracksParams(albumId: string) {
    return {
      client_id: this.clientId,
      album_id: albumId,
      limit: 'all',
      include: 'stats',
      imagesize: 300,
      format: 'json',
    };
  }
}
