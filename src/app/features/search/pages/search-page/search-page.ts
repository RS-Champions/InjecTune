import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchMockService } from '@features/search/services/search-mock.service';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, SearchTrackCard, TuiIcon, TuiInput, TuiTooltip],
  templateUrl: './search-page.html',
  styleUrl: './search-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly service = inject(SearchMockService);

  protected readonly currentTrack = signal<SearchTrack | null>(null);

  protected readonly searchQuery = signal('');
  protected readonly searchResult = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.service.search(query)),
    ),
  );

  onPlay(track: SearchTrack): void {
    if (!this.currentTrack() || this.currentTrack()!.id !== track.id) {
      this.currentTrack.set(track);
    }
  }

  onPause(track: SearchTrack): void {
    if (this.currentTrack() && this.currentTrack()!.id === track.id) {
      this.currentTrack.set(null);
    }
  }
}
