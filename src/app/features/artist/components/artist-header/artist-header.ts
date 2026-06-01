import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Artist } from '@features/artist/interfaces/artist.model';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-artist-header',
  imports: [TuiIcon, TuiButton],
  templateUrl: './artist-header.html',
  styleUrl: './artist-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistHeader {
  readonly artist = input.required<Artist>();
}
