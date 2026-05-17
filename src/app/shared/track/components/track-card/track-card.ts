import { Component, input, output } from '@angular/core';
import { ArtistTrack } from '@shared/track/interfaces/artist-track';

@Component({
  selector: 'app-track-card',
  imports: [],
  templateUrl: './track-card.html',
  styleUrl: './track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
})
export class TrackCard {
  readonly track = input.required<ArtistTrack>();

  readonly isPlaying = input(false);
  readonly index = input<number>();

  readonly playTrack = output<ArtistTrack>();
  readonly pauseTrack = output<ArtistTrack>();

  onPlay(): void {
    this.playTrack.emit(this.track());
  }

  onPause(): void {
    this.pauseTrack.emit(this.track());
  }
}
