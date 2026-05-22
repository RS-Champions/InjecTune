import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchMockService } from '@features/search/services/search-mock.service';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; results: SearchTrack[]; totalCount: number }
  | { status: 'empty' }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, SearchTrackCard, TuiIcon, TuiInput, TuiTooltip],
  templateUrl: './search-page.html',
  styleUrl: './search-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SearchMockService);

  protected get successState(): { results: SearchTrack[]; totalCount: number } | null {
    const state = this.searchState();
    return state.status === 'success' ? state : null;
  }

  protected get errorMessage(): string | null {
    const state = this.searchState();
    return state.status === 'error' ? state.message : null;
  }

  protected readonly searchQuery = signal(this.route.snapshot.queryParamMap.get('q') ?? '');

  protected readonly searchState = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        void this.router.navigate([], {
          queryParams: { q: query || null },
          queryParamsHandling: 'merge',
        });
      }),
      switchMap((query) => {
        if (!query.trim()) {
          return of<SearchState>({ status: 'idle' });
        }

        return this.service.search(query).pipe(
          map((result) =>
            result.totalCount > 0
              ? ({ status: 'success', results: result.results, totalCount: result.totalCount } satisfies SearchState)
              : ({ status: 'empty' } satisfies SearchState),
          ),
          startWith<SearchState>({ status: 'loading' }),
          catchError((error: unknown) => {
            const message = error instanceof Error ? error.message : 'Something went wrong';
            return of<SearchState>({ status: 'error', message });
          }),
        );
      }),
    ),
    { initialValue: { status: 'idle' } as SearchState },
  );

  protected readonly currentTrack = signal<SearchTrack | null>(null);

  onPlay(track: SearchTrack): void {
    if (this.currentTrack()?.id !== track.id) {
      this.currentTrack.set(track);
    }
  }

  onPause(track: SearchTrack): void {
    if (this.currentTrack()?.id === track.id) {
      this.currentTrack.set(null);
    }
  }
}
