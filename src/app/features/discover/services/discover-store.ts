import { inject, Injectable, signal } from '@angular/core';
import { DiscoverApi } from './discover-api';

@Injectable({
  providedIn: 'root',
})
export class DiscoverStore {
  private readonly api = inject(DiscoverApi);
  public readonly popularTracksResource = this.api.popularTracksResource.asReadonly();
  public readonly releaseTracksResource = this.api.releaseTracksResource.asReadonly();

  // it will be field of global player
  public readonly currentTrackId = signal<string>('');

  public toggleTrack(id: string) {
    // by id store will be call methods of global player
    if (this.currentTrackId() === id) {
      this.currentTrackId.set('');
    } else {
      this.currentTrackId.set(id);
    }
    console.log(id);
  }
}
