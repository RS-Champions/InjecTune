import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArtistTrack } from '@features/artist/interfaces/artist.model';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';
import { TuiAppearance, TuiButton, TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-artist-track-card',
  imports: [Equalizer, FormatDurationPipe, FormatPlayCountPipe, TuiAppearance, TuiButton, TuiHint],
  templateUrl: './artist-track-card.html',
  styleUrl: './artist-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistTrackCard extends Track<ArtistTrack> {}
