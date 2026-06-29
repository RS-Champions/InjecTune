import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiAppearance, TuiButton, TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-track-card',
  imports: [Equalizer, FormatDurationPipe, RouterLink, TuiAppearance, TuiButton, TuiHint],
  templateUrl: './playlist-track-card.html',
  styleUrl: './playlist-track-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistTrackCard extends Track<EnrichedPlaylistTrack> {
  readonly removeTrack = output<EnrichedPlaylistTrack>();

  protected onRemove(): void {
    this.removeTrack.emit(this.track());
  }
}
