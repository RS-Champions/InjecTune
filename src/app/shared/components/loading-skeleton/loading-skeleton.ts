import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';

export enum PageName {
  ALBUM = 'album',
  ARTIST = 'artist',
  SEARCH = 'search',
}

@Component({
  selector: 'app-loading-skeleton',
  imports: [TuiSkeleton],
  templateUrl: './loading-skeleton.html',
  styleUrl: './loading-skeleton.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeleton {
  readonly isLoading = input.required<boolean>();
  readonly pageName = input.required<PageName>();
}
