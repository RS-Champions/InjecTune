import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, firstValueFrom, tap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchMockService } from '@features/search/services/search-mock.service';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SearchMockService);

  protected readonly currentTrack = signal<SearchTrack | null>(null);
  protected readonly searchQuery = signal(this.route.snapshot.queryParamMap.get('q') ?? '');

  protected readonly debouncedQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        void this.router.navigate([], {
          queryParams: { q: query || null },
          queryParamsHandling: 'merge',
        });
      }),
    ),
    { initialValue: this.route.snapshot.queryParamMap.get('q') ?? '' },
  );

  protected readonly searchResource = resource({
    params: () => ({ query: this.debouncedQuery() }),
    loader: ({ params }) => firstValueFrom(this.service.search(params.query)),
  });

  protected get successState(): { results: SearchTrack[]; totalCount: number } | null {
    if (!this.searchResource.hasValue()) return null;
    const value = this.searchResource.value();
    return value.totalCount > 0 ? value : null;
  }

  protected get errorMessage(): string | null {
    const error = this.searchResource.error();
    return error instanceof Error ? error.message : null;
  }

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
