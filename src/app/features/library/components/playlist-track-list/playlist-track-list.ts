import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { PlaylistTrackCard } from '../playlist-track-card/playlist-track-card';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-track-list',
  imports: [PlaylistTrackCard, TuiIcon],
  templateUrl: './playlist-track-list.html',
  styleUrl: './playlist-track-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistTrackList {
  readonly tracks = input.required<EnrichedPlaylistTrack[]>();
  readonly currentTrack = input<BaseTrack | null>(null);
  readonly isPlaying = input(false);

  readonly trackPlay = output<EnrichedPlaylistTrack>();
  readonly trackPause = output<EnrichedPlaylistTrack>();
  readonly trackRemove = output<EnrichedPlaylistTrack>();

  /** Derives isPlaying state per card — true only for the currently active track */
  protected isTrackPlaying = (track: EnrichedPlaylistTrack): boolean =>
    this.isPlaying() && this.currentTrack()?.id === track.id;
}
