import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArtistTrack } from '@features/artist/interfaces/artist.model';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-artist-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe, TuiButton, TuiAppearance],
  templateUrl: './artist-track-card.html',
  styleUrl: './artist-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistTrackCard extends Track<ArtistTrack> {}
