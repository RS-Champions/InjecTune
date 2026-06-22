import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PlaylistItem } from '@features/library/interfaces/library.model';
import { TuiIcon } from '@taiga-ui/core/components/icon';

@Component({
  selector: 'app-playlist-card',
  imports: [TuiIcon],
  templateUrl: './playlist-card.html',
  styleUrl: './playlist-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCard {
  readonly playlist = input.required<PlaylistItem>();
  readonly playlistClick = output();
}
