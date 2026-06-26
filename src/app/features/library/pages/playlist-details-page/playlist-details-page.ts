import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AudioEngine, PlayerStore } from '@core/player';
import { PlaylistTrackList } from '@features/library/components/playlist-track-list/playlist-track-list';
import { PlaylistTrackSearch } from '@features/library/components/playlist-track-search/playlist-track-search';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { LibraryApi } from '@features/library/services/library.api';
import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { LoadingSkeleton } from '@shared/components/loading-skeleton/loading-skeleton';
import { PageName } from '@shared/constants/page-name';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiButton, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { TuiToastService } from '@taiga-ui/kit';

@Component({
  selector: 'app-playlist-details-page',
  imports: [FormatDurationPipe, LoadingSkeleton, PlaylistTrackList, PlaylistTrackSearch, TuiButton, TuiIcon, TuiLoader],
  templateUrl: './playlist-details-page.html',
  styleUrl: './playlist-details-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly libraryApi = inject(LibraryApi);
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);
  private readonly toasts = inject(TuiToastService);

  private readonly audioEngine = inject(AudioEngine);
  protected readonly playerStore = inject(PlayerStore);

  readonly pageName = PageName.LIBRARY_PLAYLIST;

  private readonly idFromRoute = toSignal(this.route.params.pipe(map((p) => p['id'] as string | null)), {
    initialValue: this.route.snapshot.params['id'] as string | null,
  });

  readonly detailsResource = this.libraryApi.playlistDetailsResource(this.idFromRoute);

  readonly tracksResource = rxResource({
    params: () => this.detailsResource.value()?.playlist_tracks ?? [],
    stream: ({ params: playlistTracks }) => {
      if (playlistTracks.length === 0) return of([] as EnrichedPlaylistTrack[]);
      return this.playlistJamendoApi.enrichTracks(playlistTracks).pipe(catchError(() => of([] as EnrichedPlaylistTrack[])));
    },
  });

  // ── Derived state ─────────────────────────────────────────────────────────

  readonly playlist = computed(() => this.detailsResource.value());
  readonly tracks = computed(() => this.tracksResource.value() ?? []);
  readonly isLoading = computed(() => this.detailsResource.isLoading() || this.tracksResource.isLoading());

  readonly coverImages = computed(() =>
    this.tracks()
      .map((t) => t.image)
      .filter(Boolean)
      .slice(0, 4),
  );

  readonly totalDuration = computed(() => this.tracks().reduce((sum, t) => sum + Number(t.duration), 0));

  // ── Track addition (Issue #9(136)) ─────────────────────────────────────────────

  private readonly existingTrackIds = computed(
    () => new Set(this.detailsResource.value()?.playlist_tracks.map((t) => t.track_id)),
  );

  readonly isAddingTrack = signal(false);

  protected readonly isPlayingThisPlaylist = computed(() => {
    if (!this.playerStore.isPlaying()) return false;
    const currentTrackId = this.playerStore.currentTrack()?.id;
    return this.tracks().some((t) => t.id === currentTrackId);
  });

  onTrackSelected(track: SearchTrack): void {
    const id = this.idFromRoute();
    if (!id) return;

    if (this.existingTrackIds().has(track.id)) {
      this.toasts
        .open(`"${track.name}" is already in this playlist.`, {
          appearance: 'warning',
          autoClose: 3000,
        })
        .subscribe();
      return;
    }

    const position = this.detailsResource.value()?.playlist_tracks.length ?? 0;

    this.isAddingTrack.set(true);

    this.libraryApi.addTrackToPlaylist(id, { source: 'jamendo', trackId: track.id, position }).subscribe({
      next: () => {
        this.isAddingTrack.set(false);
        this.detailsResource.reload();
      },
      error: () => {
        this.isAddingTrack.set(false);
        this.toasts
          .open('Failed to add track. Please try again.', {
            appearance: 'destructive',
            autoClose: 3000,
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

  protected onRemoveTrack(): void {
    // TODO
  }
}
