import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { RouterLink } from '@angular/router';

import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';

import { TuiAppearance, TuiButton, TuiHint, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-track-card',
  imports: [Equalizer, FormatDurationPipe, CdkDragHandle, RouterLink, TuiAppearance, TuiButton, TuiHint, TuiIcon],
  templateUrl: './playlist-track-card.html',
  styleUrl: './playlist-track-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistTrackCard extends Track<EnrichedPlaylistTrack> {
  /** When true, shows the drag handle — provided by PlaylistTrackList */
  readonly isDraggable = input(false);

  readonly removeTrack = output<EnrichedPlaylistTrack>();

  protected onRemove(): void {
    this.removeTrack.emit(this.track());
  }
}
