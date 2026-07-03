import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-library-playlists-skeleton',
  imports: [TuiSkeleton],
  templateUrl: './library-playlists-skeleton.html',
  styleUrl: './library-playlists-skeleton.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPlaylistsSkeleton {
  readonly items = Array.from({ length: 3 });
}
