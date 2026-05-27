import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchFilters, DurationFilter } from '@features/search/interfaces/search-filters';
import { SearchStore } from '@features/search/services/search-store';
import { SearchFiltersPanel } from '@features/search/components/search-filters-panel/search-filters-panel';
import { SearchTopResultTrackCard } from '@features/search/components/search-top-result-track-card/search-top-result-track-card';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { mapApiParametersToDuration, mapDurationToApiParameters } from '@features/search/utils/duration-filter';

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
  protected readonly store = inject(SearchStore);

  protected readonly q = input('');
  protected readonly searchQuery = linkedSignal(() => this.q());

  protected readonly initialFilters = toSignal<SearchFilters, SearchFilters>(
    this.route.queryParamMap.pipe(map((parameters) => this.filtersFromParameters(parameters))),
    { initialValue: this.filtersFromParameters(this.route.snapshot.queryParamMap) },
  );

  protected readonly filters = linkedSignal<SearchFilters>(this.initialFilters);

  protected readonly debouncedQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        this.syncUrl(query, this.filters());
      }),
    ),
    { initialValue: this.q() },
  );

  constructor() {
    effect(() => {
      this.store.query.set(this.debouncedQuery());
      this.store.filters.set(this.filters());
    });
  }

  protected onFiltersChange(filters: SearchFilters): void {
    this.filters.set(filters);
    this.syncUrl(this.debouncedQuery(), filters);
  }

  private filtersFromParameters(parameters: ParamMap): SearchFilters {
    const genres = parameters.get('genres')?.split(',').filter(Boolean) ?? [];
    const duration = parameters.get('duration') as DurationFilter | null;
    const sortBy = parameters.get('sort') ?? undefined;

    const range = mapDurationToApiParameters(duration);

    return {
      ...(genres.length > 0 && { genres }),
      ...range,
      ...(sortBy && { sortBy: sortBy as SearchFilters['sortBy'] }),
    };
  }

  private syncUrl(query: string, filters: SearchFilters): void {
    const duration = mapApiParametersToDuration(filters);

    void this.router.navigate([], {
      queryParams: {
        q: query || null,
        genres: filters.genres?.join(',') ?? null,
        duration,
        sort: filters.sortBy ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });
  }

  onPlay(track: SearchTrack): void {
    if (this.store.currentTrack()?.id !== track.id) this.store.currentTrack.set(track);
  }

  onPause(track: SearchTrack): void {
    if (this.store.currentTrack()?.id === track.id) this.store.currentTrack.set(null);
  }
}
