import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PlaylistCard } from '@features/library/components/playlist-card/playlist-card';
import { PlaylistItem, RecentTrack } from '@features/library/interfaces/library.model';
import { LibraryApi } from '@features/library/services/library.api';
import { LoadingSkeleton } from '@shared/components/loading-skeleton/loading-skeleton';
import { MusicCardComponent } from '@shared/components/music-card/music-card.component';
import { PageName } from '@shared/constants/page-name';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-library-page',
  imports: [LoadingSkeleton, MusicCardComponent, PlaylistCard, TuiButton, TuiIcon],
  templateUrl: './library-page.html',
  styleUrl: './library-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  private readonly libraryApi = inject(LibraryApi);

  readonly pageName = PageName.LIBRARY;

  // ── Resources ──────────────────────────────────────────────────────────────

  readonly playlistsResource = this.libraryApi.playlistsResource;
  readonly favoritesResource = this.libraryApi.favoritesResource;

  // ── Derived state ──────────────────────────────────────────────────────────

  readonly playlists = (): PlaylistItem[] =>
    (this.playlistsResource.value() ?? []).map((p) => ({
      id: p.id,
      cover: p.image ?? null,
      name: p.name,
      meta: p.description ?? '',
    }));

  /**
   * Liked Songs is a special auto-playlist backed by the favorites table.
   * Its track count updates reactively as favoritesResource loads.
   */
  readonly likedSongsCard = (): PlaylistItem => ({
    id: 'liked',
    cover: null,
    name: 'Liked Songs',
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
    // TODO(#7): open playlist creation dialog, then on confirm:
    // this.libraryApi.createPlaylist(dto).subscribe(() => this.playlistsResource.reload());
    console.log('open create playlist dialog');
  }

  onPlaylistClick(playlist: PlaylistItem): void {
    // TODO(#8): navigate to playlist details route
    console.log('open playlist', playlist.id);
  }

  onLikedSongsClick(): void {
    // TODO(#8): navigate to liked songs details route
    console.log('open liked songs');
  }
}
