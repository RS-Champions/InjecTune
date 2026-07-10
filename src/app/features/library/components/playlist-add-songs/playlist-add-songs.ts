import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';

import { OwnTrack } from '@features/library/interfaces/library-api.model';
import { toSearchTrack } from '@features/library/interfaces/own-track.mapper';
import { LibraryApi } from '@features/library/services/library.api';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { OwnTrackUploadDialog, OwnTrackUploadResult } from '../own-track-upload-dialog/own-track-upload-dialog';
import { PlaylistTrackSearch } from '../playlist-track-search/playlist-track-search';
import { TuiButton, TuiDialogService, TuiIcon } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiSegmented } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

export interface TrackSelection {
  track: SearchTrack;
  source: 'jamendo' | 'own';
}

@Component({
  selector: 'app-playlist-add-songs',
  imports: [FormatDurationPipe, PlaylistTrackSearch, TuiButton, TuiIcon, TuiSegmented],
  templateUrl: './playlist-add-songs.html',
  styleUrl: './playlist-add-songs.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistAddSongs {
  private readonly libraryApi = inject(LibraryApi);
  private readonly dialogs = inject(TuiDialogService);
  private readonly destroyRef = inject(DestroyRef);

  readonly trackSelected = output<TrackSelection>();

  /**
   * Emitted after an own track is deleted from "My uploads". Deleting here cascades on the backend — it removes
   * the track from every playlist it was in, not just this one — so the parent should reload
   * its own playlist details in case the deleted track was part of it.
   */
  readonly trackDeleted = output();

  protected readonly activeIndex = signal(0);
  protected readonly isUploading = signal(false);
  protected readonly deletingTrackId = signal<string | null>(null);

  protected readonly ownTracksResource = this.libraryApi.ownTracksResource();

  protected readonly ownSearchTracks = computed(() => this.ownTracksResource.value().map((track) => toSearchTrack(track)));

  protected onJamendoTrackSelected(track: SearchTrack): void {
    this.trackSelected.emit({ track, source: 'jamendo' });
  }

  protected onOwnTrackSelected(track: SearchTrack): void {
    this.trackSelected.emit({ track, source: 'own' });
  }

  protected onUploadClick(): void {
    this.dialogs
      .open<OwnTrackUploadResult | null>(new PolymorpheusComponent(OwnTrackUploadDialog), {
        label: 'Upload a track',
        size: 's',
      })
      .pipe(
        filter((result): result is OwnTrackUploadResult => result !== null),
        switchMap(({ file, dto }) => {
          this.isUploading.set(true);
          return this.libraryApi.uploadTrack(file, dto);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (uploaded: OwnTrack) => {
          this.isUploading.set(false);
          this.ownTracksResource.reload();
          this.trackSelected.emit({ track: toSearchTrack(uploaded), source: 'own' });
        },
        error: () => {
          this.isUploading.set(false);
        },
      });
  }

  protected onDeleteClick(track: SearchTrack): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: `Delete "${track.name}"? It will be removed from every playlist it's in — this can't be undone.`,
        size: 's',
        data: track.id,
      })
      .pipe(
        filter(Boolean),
        switchMap(() => {
          this.deletingTrackId.set(track.id);
          return this.libraryApi.deleteTrack(track.id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.deletingTrackId.set(null);
          this.ownTracksResource.reload();
          this.trackDeleted.emit();
        },
        error: () => {
          this.deletingTrackId.set(null);
        },
      });
  }
}
