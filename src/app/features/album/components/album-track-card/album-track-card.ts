import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlbumTrack } from '@features/album/interfaces/album-track';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-album-track-card',
  imports: [Equalizer, FormatDurationPipe, FormatPlayCountPipe, TuiButton, TuiAppearance],
  templateUrl: './album-track-card.html',
  styleUrl: './album-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTrackCard extends Track<AlbumTrack> {}
