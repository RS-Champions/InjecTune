import { inject, Injectable, signal } from '@angular/core';
import { DiscoverApi } from './discover-api';

@Injectable({
  providedIn: 'root',
})
export class DiscoverStore {
  private readonly api = inject(DiscoverApi);
  public readonly popularTracksResource = this.api.popularTracksResource.asReadonly();

  // it will be field of global player
  public readonly currentTrackId = signal<string>('');

  public playTrack(id: string) {
    // by id store will be call methods of global player
    this.currentTrackId.set(id);
    console.log(id);
  }
}
