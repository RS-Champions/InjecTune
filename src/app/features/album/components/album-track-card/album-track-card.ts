import { Component, input } from '@angular/core';
import { AlbumTrack } from '@features/album/interfaces/album-track';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

@Component({
  selector: 'app-album-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe],
  templateUrl: './album-track-card.html',
  styleUrl: './album-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
})
export class AlbumTrackCard extends Track<AlbumTrack> {
  readonly index = input<number>();
}
