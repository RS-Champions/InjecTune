import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { filter, switchMap } from 'rxjs';

import {
  PlaylistFormDialog,
  PlaylistFormDialogData,
} from '@features/library/components/playlist-form-dialog/playlist-form-dialog';
import { PlaylistCard } from '@features/library/components/playlist-card/playlist-card';
import { PlaylistItem, RecentTrack } from '@features/library/interfaces/library.model';
import { LibraryApi } from '@features/library/services/library.api';
import { LoadingSkeleton } from '@shared/components/loading-skeleton/loading-skeleton';
import { MusicCardComponent } from '@shared/components/music-card/music-card.component';
import { PageName } from '@shared/constants/page-name';

import { TuiButton, TuiDialogService, TuiIcon } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { CreatePlaylistDto } from '@features/library/interfaces/library-api.model';

@Component({
  selector: 'app-library-page',
  imports: [LoadingSkeleton, MusicCardComponent, PlaylistCard, TuiButton, TuiIcon],
  templateUrl: './library-page.html',
  styleUrl: './library-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly libraryApi = inject(LibraryApi);
  private readonly dialogs = inject(TuiDialogService);

  readonly pageName = PageName.LIBRARY;

  readonly playlistsResource = this.libraryApi.playlistsResource;
  readonly favoritesResource = this.libraryApi.favoritesResource;

  readonly playlists = (): PlaylistItem[] =>
    (this.playlistsResource.value() ?? []).map((p) => ({
      id: p.id,
      cover: p.image ?? null,
      name: p.name,
      description: p.description ?? '',
      meta: p.description ?? '', // TODO: replace with track count when available
    }));

  readonly likedSongsCard = (): PlaylistItem => ({
    id: 'liked',
    cover: null,
    name: 'Liked Songs',
    description: 'Auto-playlist',
    meta: `Auto-playlist • ${(this.favoritesResource.value()?.length ?? 0).toString()} songs`,
  });

  // ── Stub data ──────────────────────────────────────────────────────────────
  // TODO(#12,#13): replace with recentlyPlayedResource

  readonly recentTracks: RecentTrack[] = [
    {
      id: '1',
      cover: 'https://placehold.co/160x160/231e27/ddb7ff?text=♪',
      title: 'Cyber Echo',
      subtitle: 'Synthwave Pulse',
    },
    {
      id: '2',
      cover: 'https://placehold.co/160x160/231e27/ddb7ff?text=♪',
      title: 'Midnight Lounge',
      subtitle: 'Lo-Fi Collective',
    },
    { id: '3', cover: 'https://placehold.co/160x160/231e27/ddb7ff?text=♪', title: 'Neon Drift', subtitle: 'Retrowave' },
    {
      id: '4',
      cover: 'https://placehold.co/160x160/231e27/ddb7ff?text=♪',
      title: 'Acoustic Soul',
      subtitle: 'Folk Sessions',
    },
    { id: '5', cover: 'https://placehold.co/160x160/231e27/ddb7ff?text=♪', title: 'Deep Tide', subtitle: 'Ambient Wave' },
  ];

  // ── Handlers ───────────────────────────────────────────────────────────────

  onTrackClick(track: RecentTrack): void {
    // TODO(#5): dispatch to PlayerStore
    console.log('play track', track.id);
  }

  onCreatePlaylist(): void {
    this.openPlaylistDialog({})
      .pipe(
        filter((result): result is CreatePlaylistDto => result !== null),
        switchMap((dto) => this.libraryApi.createPlaylist(dto)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((playlist) => {
        // Navigate directly to the new playlist's details page.
        // The CanDeactivate guard will clean it up if the user leaves with 0 tracks.
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

  // ── Helpers ────────────────────────────────────────────────────────────────

  private openPlaylistDialog(data: PlaylistFormDialogData) {
    return this.dialogs.open<CreatePlaylistDto | null>(new PolymorpheusComponent(PlaylistFormDialog), {
      label: data.playlist ? 'Edit playlist' : 'Create playlist',
      size: 's',
      data,
    });
  }
}
