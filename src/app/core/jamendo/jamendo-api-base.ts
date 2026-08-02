import { inject, Injectable } from '@angular/core';
import { JAMENDO_CLIENT_ID, JAMENDO_API_URL } from '@core/tokens/jamendo.tokens';

@Injectable({
  providedIn: 'root',
})
export class JamendoApiBase {
  private readonly clientId = inject(JAMENDO_CLIENT_ID);
  private readonly apiUrl = inject(JAMENDO_API_URL);

  // Jamendo imposes a max of 50 IDs per request.
  readonly JAMENDO_BATCH_SIZE = 50;

  readonly albumsUrl = `${this.apiUrl}/albums`;
  readonly albumsTracksUrl = `${this.apiUrl}/albums/tracks`;
  readonly artistsAlbumsUrl = `${this.apiUrl}/artists/albums`;
  readonly tracksUrl = `${this.apiUrl}/tracks`;
  readonly popularTracksUrl = `${this.apiUrl}/tracks?order=popularity_total`;
  readonly releaseTracksUrl = `${this.apiUrl}/tracks?order=releasedate_desc`;

  baseParams() {
    return { client_id: this.clientId, format: 'json' } as const;
  }
}
