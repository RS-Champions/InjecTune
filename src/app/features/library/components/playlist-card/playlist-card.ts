import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PlaylistItem } from '@features/library/interfaces/library.model';
import { TuiButton, TuiIcon } from '@taiga-ui/core/components';

@Component({
  selector: 'app-playlist-card',
  imports: [TuiButton, TuiIcon],
  templateUrl: './playlist-card.html',
  styleUrl: './playlist-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCard {
  readonly playlist = input.required<PlaylistItem>();
  readonly playlistClick = output();
  readonly editClick = output();
}
