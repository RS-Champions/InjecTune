import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaylistCard } from '@features/library/components/playlist-card/playlist-card';
import { RecentTrack, PlaylistItem } from '@features/library/interfaces/library.model';
import { MusicCardComponent } from '@shared/components/music-card/music-card.component';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-library-page',
  imports: [MusicCardComponent, PlaylistCard, TuiButton, TuiIcon],
  templateUrl: './library-page.html',
  styleUrl: './library-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  // TODO(#12,#13): replace with recentlyPlayedResource once backend + data layer are implemented
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

  // TODO(#5): replace with playlistsResource once data layer is implemented
  readonly playlists: PlaylistItem[] = [
    { id: 'liked', cover: null, name: 'Liked Songs', description: 'Auto-playlist', meta: 'Auto-playlist' },
  ];

  onTrackClick(track: RecentTrack): void {
    // TODO(#5): dispatch to PlayerStore
    console.log('play track', track.id);
  }

  onCreatePlaylist(): void {
    // TODO(#7): open playlist creation dialog
    console.log('open create playlist dialog');
  }

  onPlaylistClick(playlist: PlaylistItem): void {
    // TODO(#8): navigate to playlist details route
    console.log('open playlist', playlist.id);
  }
}
