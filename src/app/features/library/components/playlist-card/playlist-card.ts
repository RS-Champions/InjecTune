import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PlaylistItem } from '@features/library/interfaces/library.model';
import { TuiButton } from '@taiga-ui/core/components';
import { LibraryPlaylistCover } from '../library-playlist-cover/library-playlist-cover';

@Component({
  selector: 'app-playlist-card',
  imports: [TuiButton, LibraryPlaylistCover],
  templateUrl: './playlist-card.html',
  styleUrl: './playlist-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCard {
  readonly playlist = input.required<PlaylistItem>();
  readonly playlistClick = output();
  readonly editClick = output();
}
