import { Component, input, output } from '@angular/core';
import { ArtistTrack } from '@shared/track/interfaces/artist-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

@Component({
  selector: 'app-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe],
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
