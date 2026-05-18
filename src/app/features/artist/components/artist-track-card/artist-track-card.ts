import { Component, input } from '@angular/core';
import { ArtistTrack } from '@features/artist/interfaces/artist-track';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

@Component({
  selector: 'app-artist-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe],
  templateUrl: './artist-track-card.html',
  styleUrl: './artist-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
})
export class ArtistTrackCard extends Track<ArtistTrack> {
  readonly index = input<number>();
}
