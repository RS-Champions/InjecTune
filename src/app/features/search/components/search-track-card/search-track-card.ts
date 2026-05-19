import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-search-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe, RouterLink, TuiButton, TuiAppearance],
  templateUrl: './search-track-card.html',
  styleUrl: './search-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTrackCard extends Track<SearchTrack> {}
