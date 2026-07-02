import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, filter, of, switchMap } from 'rxjs';

import {
  PlaylistFormDialog,
  PlaylistFormDialogData,
} from '@features/library/components/playlist-form-dialog/playlist-form-dialog';
import { LibraryPlaylistsSkeleton } from '@features/library/components/library-playlists-skeleton/library-playlists-skeleton';
import { LibraryRecentSkeleton } from '@features/library/components/library-recent-skeleton/library-recent-skeleton';
import { PlaylistCard } from '@features/library/components/playlist-card/playlist-card';
import { RecentlyPlayedFilter } from '@features/library/components/recently-played-filter/recently-played-filter';
import { PlaylistItem } from '@features/library/interfaces/library.model';
import { EnrichedRecentlyPlayedTrack, RecentlyPlayedFilterDto } from '@features/library/interfaces/library-api.model';
import { LibraryApi } from '@features/library/services/library.api';
import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { AudioEngine, PlayerStore } from '@core/player';
import { MusicCardComponent } from '@shared/components/music-card/music-card.component';
import { PageName } from '@shared/constants/page-name';

import { TuiButton, TuiDialogService, TuiIcon } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { CreatePlaylistDto } from '@features/library/interfaces/library-api.model';

@Component({
  selector: 'app-library-page',
  imports: [
    LibraryPlaylistsSkeleton,
    LibraryRecentSkeleton,
    MusicCardComponent,
    PlaylistCard,
    RecentlyPlayedFilter,
    TuiButton,
    TuiIcon,
  ],
  templateUrl: './library-page.html',
  styleUrl: './library-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly libraryApi = inject(LibraryApi);
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);
  private readonly dialogs = inject(TuiDialogService);

  private readonly audioEngine = inject(AudioEngine);
  protected readonly playerStore = inject(PlayerStore);

  readonly playlistsResource = this.libraryApi.playlistsResource();
  readonly favoritesResource = this.libraryApi.favoritesResource;

  // ── Recently Played (#13) ──────────────────────────────────────────────────
  // Filter signal kept here (not just inline {}) so Issue #15 can wire a date
  // picker into this same signal without changing the resource call shape.
  readonly recentlyPlayedFilter = signal<RecentlyPlayedFilterDto>({});

  readonly recentlyPlayedResource = this.libraryApi.recentlyPlayedResource(this.recentlyPlayedFilter);

  readonly enrichedRecentlyPlayedResource = rxResource({
    params: () => {
      // Return null while the upstream resource is still loading so rxResource
      // does not prematurely emit [] from the defaultValue before the HTTP
      // response arrives. null keeps the stream in a pending state.
      const isLoading = this.recentlyPlayedResource.isLoading();
      const error = this.recentlyPlayedResource.error();
      const value = this.recentlyPlayedResource.value();
      if (isLoading || error) return null;
      return value;
    },
    stream: ({ params: items }) => {
      if (!items || items.length === 0) {
        return of([] as EnrichedRecentlyPlayedTrack[]);
      }
      return this.playlistJamendoApi
        .enrichRecentlyPlayed(items)
        .pipe(catchError(() => of([] as EnrichedRecentlyPlayedTrack[])));
    },
  });

  readonly recentTracks = computed(() => this.enrichedRecentlyPlayedResource.value() ?? []);

  readonly isRecentlyPlayedLoading = computed(
    () => this.recentlyPlayedResource.isLoading() || this.enrichedRecentlyPlayedResource.isLoading(),
  );

  onFilterApplied(filter: RecentlyPlayedFilterDto): void {
    this.recentlyPlayedFilter.set(filter);
  }

  onFilterCleared(): void {
    this.recentlyPlayedFilter.set({});
  }

  readonly playlists = computed((): PlaylistItem[] =>
    this.playlistsResource.value().map((p) => ({
      id: p.id,
      cover: p.image ?? null,
      name: p.name,
      description: p.description ?? '',
      meta: p.description ?? '', // TODO: replace with track count when available
    })),
  );

  readonly likedSongsCard = computed(
    (): PlaylistItem => ({
      id: 'liked',
      cover: null,
      name: 'Liked Songs',
      description: 'Auto-playlist',
      meta: `Auto-playlist • ${(this.favoritesResource.value()?.length ?? 0).toString()} songs`,
    }),
  );

  onTrackClick(track: EnrichedRecentlyPlayedTrack): void {
    this.audioEngine.playTrack(track);
  }

  onCreatePlaylist(): void {
    this.openPlaylistDialog({})
      .pipe(
        filter((result): result is CreatePlaylistDto => result !== null),
        switchMap((dto) => this.libraryApi.createPlaylist(dto)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((playlist) => {
        void this.router.navigate([`/${PageName.LIBRARY}/playlists`, playlist.id]);
      });
  }

  onPlaylistClick(playlist: PlaylistItem): void {
    void this.router.navigate([`/${PageName.LIBRARY}/playlists`, playlist.id]);
  }

  onLikedSongsClick(): void {
    // TODO(#8): navigate to liked songs details route
    console.log('open liked songs');
  }

  private openPlaylistDialog(data: PlaylistFormDialogData) {
    return this.dialogs.open<CreatePlaylistDto | null>(new PolymorpheusComponent(PlaylistFormDialog), {
      label: data.playlist ? 'Edit playlist' : 'Create playlist',
      size: 's',
      data,
    });
  }
}
