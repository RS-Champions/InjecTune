import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArtistAlbum } from '@features/artist/interfaces/artist.model';
import { TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-artist-album-card',
  imports: [TuiHint],
  templateUrl: './artist-album-card.html',
  styleUrl: './artist-album-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistAlbumCard {
  readonly album = input.required<ArtistAlbum>();
}
