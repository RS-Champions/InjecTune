import { Component } from '@angular/core';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { FormatPlayCountPipe } from '@shared/track/pipes/format-play-count-pipe';

@Component({
  selector: 'app-search-track-card',
  imports: [FormatDurationPipe, FormatPlayCountPipe],
  templateUrl: './search-track-card.html',
  styleUrl: './search-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
})
export class SearchTrackCard extends Track<SearchTrack> {
  protected readonly isHovered = false;
}
