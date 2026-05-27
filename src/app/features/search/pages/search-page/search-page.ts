import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchStore } from '@features/search/services/search-store';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, SearchTrackCard, TuiIcon, TuiInput, TuiTooltip],
  templateUrl: './search-page.html',
  styleUrl: './search-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly router = inject(Router);
  protected readonly store = inject(SearchStore);

  protected readonly q = input('');

  protected readonly searchQuery = linkedSignal(() => this.q());

  protected readonly debouncedQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        void this.router.navigate([], {
          queryParams: { q: query || null },
          queryParamsHandling: 'merge',
          replaceUrl: false,
        });
      }),
    ),
    { initialValue: this.q() },
  );

  constructor() {
    effect(() => {
      this.store.query.set(this.debouncedQuery());
    });
  }

  onPlay(track: SearchTrack): void {
    if (this.store.currentTrack()?.id !== track.id) {
      this.store.currentTrack.set(track);
    }
  }

  onPause(track: SearchTrack): void {
    if (this.store.currentTrack()?.id === track.id) {
      this.store.currentTrack.set(null);
    }
  }
}
