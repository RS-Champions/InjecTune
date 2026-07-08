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
import { TuiSegmented } from '@taiga-ui/kit';
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

  protected readonly activeIndex = signal(0);
  protected readonly isUploading = signal(false);

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
        takeUntilDestroyed(this.destroyRef),
        switchMap(({ file, dto }) => {
          this.isUploading.set(true);
          return this.libraryApi.uploadTrack(file, dto);
        }),
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
}
