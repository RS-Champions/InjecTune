import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Track } from '@shared/track/directives/track';
import { BaseTrack } from '@shared/track/interfaces/base-track';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTrackCard extends Track<BaseTrack> {
  readonly index = input<number>();
}
