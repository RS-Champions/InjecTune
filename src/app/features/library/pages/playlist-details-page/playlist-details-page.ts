import { ChangeDetectionStrategy, Component, computed, inject, DestroyRef, input, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, tap } from 'rxjs/operators';
import { AudioEngine, PlayerStore } from '@core/player';
import { LibraryPlaylistCover } from '@features/library/components/library-playlist-cover/library-playlist-cover';
import { PlaylistAddSongs, TrackSelection } from '@features/library/components/playlist-add-songs/playlist-add-songs';
import {
  PlaylistFormDialog,
  PlaylistFormDialogData,
} from '@features/library/components/playlist-form-dialog/playlist-form-dialog';
import { PlaylistTrackList } from '@features/library/components/playlist-track-list/playlist-track-list';
import { ReorderTracksDto } from '@features/library/interfaces/library.model';
import { EnrichedPlaylistTrack, UpdatePlaylistDto } from '@features/library/interfaces/library-api.model';
import { LibraryApi } from '@features/library/services/library.api';
import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { LoadingSkeleton } from '@shared/components/loading-skeleton/loading-skeleton';
import { MAX_COVER_IMAGES, TOAST_DURATION_MS } from '@shared/constants/constants';
import { PageName } from '@shared/constants/page-name';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiButton, TuiDialogService, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiToastService } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-playlist-details-page',
  imports: [
    FormatDurationPipe,
    LoadingSkeleton,
    PlaylistAddSongs,
    PlaylistTrackList,
    TuiButton,
    TuiIcon,
    TuiLoader,
    LibraryPlaylistCover,
  ],
  templateUrl: './playlist-details-page.html',
  styleUrl: './playlist-details-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistDetailsPage {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly libraryApi = inject(LibraryApi);
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);
  private readonly dialogs = inject(TuiDialogService);
  private readonly toasts = inject(TuiToastService);

  private readonly audioEngine = inject(AudioEngine);
  protected readonly playerStore = inject(PlayerStore);

  readonly pageName = PageName.PLAYLISTS;

  readonly id = input.required<string>();

  readonly detailsResource = this.libraryApi.playlistDetailsResource(this.id);

  readonly tracksResource = rxResource({
    params: () => {
      const resourceError = this.detailsResource.error();
      const resourceValue = this.detailsResource.value();
      if (resourceError) return null;
      return resourceValue?.playlist_tracks ?? [];
    },
    stream: ({ params: playlistTracks }) => {
      if (!playlistTracks || playlistTracks.length === 0) {
        return of([] as EnrichedPlaylistTrack[]);
      }
      return this.playlistJamendoApi.enrichTracks(playlistTracks).pipe(catchError(() => of([] as EnrichedPlaylistTrack[])));
    },
  });

  readonly playlist = computed(() => this.detailsResource.value());
  readonly tracks = computed(() => this.tracksResource.value() ?? []);

  readonly hasResourceError = () => !!this.detailsResource.error();
  readonly isLoading = computed(() => this.detailsResource.isLoading() && !this.detailsResource.error());

  readonly coverImages = computed(() =>
    this.tracks()
      .map((t) => t.image)
      .filter(Boolean)
      .slice(0, MAX_COVER_IMAGES),
  );

  readonly totalDuration = computed(() => this.tracks().reduce((sum, t) => sum + Number(t.duration), 0));

  private readonly existingTrackIds = computed(
    () => new Set(this.detailsResource.value()?.playlist_tracks.map((t) => t.track_id)),
  );

  readonly isAddingTrack = signal(false);

  protected readonly isPlayingThisPlaylist = computed(() => {
    const isPlaying = this.playerStore.isPlaying();
    const currentTrackId = this.playerStore.currentTrack()?.id;
    const tracks = this.tracks();
    return isPlaying && tracks.some((t) => t.id === currentTrackId);
  });

  onTrackSelected({ track, source }: TrackSelection): void {
    const id = this.id();
    if (!id) return;

    if (this.existingTrackIds().has(track.id)) {
      this.toasts
        .open(`"${track.name}" is already in this playlist.`, {
          appearance: 'warning',
          autoClose: TOAST_DURATION_MS,
        })
        .subscribe();
      return;
    }

    const position = this.detailsResource.value()?.playlist_tracks.length ?? 0;

    this.isAddingTrack.set(true);

    this.libraryApi.addTrackToPlaylist(id, { source, trackId: track.id, position }).subscribe({
      next: () => {
        this.isAddingTrack.set(false);
        this.detailsResource.reload();
      },
      error: () => {
        this.isAddingTrack.set(false);
        this.toasts
          .open('Failed to add track. Please try again.', {
            appearance: 'destructive',
            autoClose: TOAST_DURATION_MS,
          })
          .subscribe();
      },
    });
  }

  protected onPlayAll(): void {
    if (this.isPlayingThisPlaylist()) {
      this.audioEngine.pause();
    } else {
      this.audioEngine.playQueue(this.tracks(), 0);
    }
  }

  protected onPlayTrack(track: EnrichedPlaylistTrack): void {
    this.audioEngine.playTrack(track);
  }

  protected onPauseTrack(): void {
    this.audioEngine.pause();
  }

  onRemoveTrack(track: EnrichedPlaylistTrack): void {
    const id = this.id();
    if (!id) return;

    this.libraryApi.removeTrackFromPlaylist(id, track.track_id, track.source).subscribe({
      next: () => this.detailsResource.reload(),
      error: () => {
        this.toasts.open('Failed to remove track.', { appearance: 'negative', autoClose: TOAST_DURATION_MS }).subscribe();
      },
    });
  }

  onEdit(): void {
    const editingPlaylist = this.playlist();
    if (!editingPlaylist) return;

    const data: PlaylistFormDialogData = {
      playlist: {
        id: editingPlaylist.id,
        cover: editingPlaylist.image ?? null,
        name: editingPlaylist.name,
        description: editingPlaylist.description ?? '',
        meta: '',
      },
    };

    this.dialogs
      .open<UpdatePlaylistDto | null>(new PolymorpheusComponent(PlaylistFormDialog), {
        label: 'Edit playlist',
        size: 's',
        data,
      })
      .pipe(
        filter((result): result is UpdatePlaylistDto => result !== null),
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((dto) => this.libraryApi.updatePlaylist(editingPlaylist.id, dto)),
        tap(() => {
          this.detailsResource.reload();
        }),
      )
      .subscribe();
  }

  onDelete(): void {
    const id = this.id();
    if (!id) return;

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Are you sure?',
        size: 's',
        data: id,
      })
      .pipe(
        filter(Boolean),
        takeUntilDestroyed(this.destroyRef),
        concatMap(() => this.libraryApi.deletePlaylist(id)),
        concatMap(() => from(this.router.navigate([`/${PageName.LIBRARY}`]))),
      )
      .subscribe();
  }

  onBack(): void {
    void this.router.navigate([`/${PageName.LIBRARY}`]);
  }

  onTracksReordered(reodered: EnrichedPlaylistTrack[]) {
    const id = this.id();
    if (!id) return;

    const dto: ReorderTracksDto = {
      tracks: reodered.map((track, index) => ({
        id: track.id,
        position: index,
      })),
    };

    this.libraryApi.reorderTracks(id, dto).subscribe({
      next: () => {
        this.detailsResource.reload();
      },
      error: () => {
        this.detailsResource.reload();
        this.toasts
          .open('Failed to save track order. Order has been reverted.', {
            appearance: 'negative',
            autoClose: 5000,
          })
          .subscribe();
      },
    });
  }
}
