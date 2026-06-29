import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

import { TuiAppearance, TuiButton, TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-search-track-card',
  imports: [Equalizer, FormatDurationPipe, FormatPlayCountPipe, RouterLink, TuiAppearance, TuiButton, TuiHint],
  templateUrl: './search-track-card.html',
  styleUrl: './search-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTrackCard extends Track<SearchTrack> {}
