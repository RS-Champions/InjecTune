import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragPlaceholder, moveItemInArray } from '@angular/cdk/drag-drop';

import { PlaylistTrackCard } from '@features/library/components/playlist-track-card/playlist-track-card';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { BaseTrack } from '@shared/track/interfaces/base-track';

import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-track-list',
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder, PlaylistTrackCard, TuiIcon],
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

  /**
   * Emits the reordered track list after a drop.
   * Parent is responsible for persisting via PATCH /playlists/:id/reorder.
   * The emitted array already has positions updated (0-indexed by array index).
   */
  readonly tracksReordered = output<EnrichedPlaylistTrack[]>();

  /**
   * Local mutable copy for optimistic UI — initialised from input on each drop.
   * We don't maintain a permanent local copy because the parent controls the
   * source of truth; we only mutate transiently during the drag animation.
   */
  protected readonly localTracks = signal<EnrichedPlaylistTrack[]>([]);
  protected readonly isDragging = signal(false);

  protected isTrackPlaying(track: EnrichedPlaylistTrack): boolean {
    return this.isPlaying() && this.currentTrack()?.id === track.id;
  }

  /**
   * Returns the display list — local (optimistic) while dragging,
   * input tracks otherwise.
   */
  protected get displayTracks(): EnrichedPlaylistTrack[] {
    return this.isDragging() ? this.localTracks() : this.tracks();
  }

  onDragStarted(): void {
    this.localTracks.set([...this.tracks()]);
    this.isDragging.set(true);
  }

  onDrop(event: CdkDragDrop<EnrichedPlaylistTrack[]>): void {
    if (event.previousIndex === event.currentIndex) {
      this.isDragging.set(false);
      return;
    }

    const reordered = [...this.localTracks()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.localTracks.set(reordered);
    this.isDragging.set(false);

    this.tracksReordered.emit(reordered);
  }
}
