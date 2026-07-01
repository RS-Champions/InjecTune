import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-library-recent-skeleton',
  imports: [TuiSkeleton],
  templateUrl: './library-recent-skeleton.html',
  styleUrl: './library-recent-skeleton.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryRecentSkeleton {
  readonly items = Array.from({ length: 5 });
}
