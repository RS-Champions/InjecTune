import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, firstValueFrom, map, tap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchFilters, DurationFilter } from '@features/search/interfaces/search-filters';
import { SearchMockService } from '@features/search/services/search-mock.service';
import { SearchFiltersPanel } from '@features/search/components/search-filters-panel/search-filters-panel';
import { SearchTopResultTrackCard } from '@features/search/components/search-top-result-track-card/search-top-result-track-card';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { mapApiParametrsToDuration, mapDurationToApiParametrs } from '@features/search/utils/duration-filter';

import { TuiIcon, TuiInput, TuiLoader } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-page',
  imports: [
    FormsModule,
    SearchFiltersPanel,
    SearchTrackCard,
    SearchTopResultTrackCard,
    TuiIcon,
    TuiInput,
    TuiLoader,
    TuiTooltip,
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SearchMockService);

  protected readonly currentTrack = signal<SearchTrack | null>(null);

  private readonly queryParam = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('q') ?? '')), {
    initialValue: this.route.snapshot.queryParamMap.get('q') ?? '',
  });

  protected readonly searchQuery = linkedSignal(() => this.queryParam());

  // read initial filter state from URL on load
  protected readonly initialFilters = toSignal<SearchFilters, SearchFilters>(
    this.route.queryParamMap.pipe(map(() => this.filtersFromUrl())),
    {
      initialValue: this.filtersFromUrl(),
    },
  );

  // active filters signal — updated when panel emits
  protected readonly filters = linkedSignal<SearchFilters>(this.initialFilters);

  protected readonly debouncedQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        this.syncUrl(query, this.filters());
      }),
    ),
    { initialValue: this.route.snapshot.queryParamMap.get('q') ?? '' },
  );

  protected readonly searchResource = resource({
    params: () => ({
      query: this.debouncedQuery(),
      filters: this.filters(),
    }),
    loader: async ({ params, abortSignal }) =>
      firstValueFrom(this.service.search(params.query, abortSignal, params.filters)),
  });

  // filter change from panel
  protected onFiltersChange(filters: SearchFilters): void {
    this.filters.set(filters);
    this.syncUrl(this.debouncedQuery(), filters);
  }

  // helpers
  private filtersFromUrl(): SearchFilters {
    const parametrs = this.route.snapshot.queryParamMap;
    const genres = parametrs.get('genres')?.split(',').filter(Boolean) ?? [];
    const duration = parametrs.get('duration') as DurationFilter | null;
    const sortBy = parametrs.get('sort') ?? undefined;

    const range = mapDurationToApiParametrs(duration);

    return {
      ...(genres.length > 0 && { genres }),
      ...range,
      ...(sortBy && { sortBy: sortBy as SearchFilters['sortBy'] }),
    };
  }

  private syncUrl(query: string, filters: SearchFilters): void {
    const duration: DurationFilter = mapApiParametrsToDuration(filters);

    void this.router.navigate([], {
      queryParams: {
        q: query,
        genres: filters.genres?.join(',') ?? null,
        duration: duration,
        sort: filters.sortBy ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });
  }

  // state getters
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
    if (this.currentTrack()?.id !== track.id) this.currentTrack.set(track);
  }

  onPause(track: SearchTrack): void {
    if (this.currentTrack()?.id === track.id) this.currentTrack.set(null);
  }
}
