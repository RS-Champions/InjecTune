import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

import { TuiAppearance, TuiButton, TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-search-top-result-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe, RouterLink, TuiAppearance, TuiButton, TuiHint],
  templateUrl: './search-top-result-track-card.html',
  styleUrl: './search-top-result-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTopResultTrackCard extends Track<SearchTrack> {}
