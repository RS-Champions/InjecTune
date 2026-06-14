import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Artist } from '@features/artist/interfaces/artist.model';
import { TuiButton, TuiHint, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-artist-header',
  imports: [TuiButton, TuiHint, TuiIcon],
  templateUrl: './artist-header.html',
  styleUrl: './artist-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistHeader {
  readonly artist = input.required<Artist>();
  readonly isPlayingAll = input(false);

  readonly playAll = output();

  onPlayAll(): void {
    this.playAll.emit();
  }
}
