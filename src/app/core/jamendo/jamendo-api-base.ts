import { inject, Injectable } from '@angular/core';
import { JAMENDO_CLIENT_ID, JAMENDO_API_URL } from '@core/tokens/jamendo.tokens';

@Injectable({
  providedIn: 'root',
})
export class JamendoApiBase {
  private readonly clientId = inject(JAMENDO_CLIENT_ID);
  private readonly apiUrl = inject(JAMENDO_API_URL);

  readonly albumsUrl = `${this.apiUrl}/albums`;
  readonly albumsTracksUrl = `${this.apiUrl}/albums/tracks`;
  readonly artistsAlbumsUrl = `${this.apiUrl}/artists/albums`;
  readonly tracksUrl = `${this.apiUrl}/tracks`;

  baseParams() {
    return { client_id: this.clientId, format: 'json' } as const;
  }
}
