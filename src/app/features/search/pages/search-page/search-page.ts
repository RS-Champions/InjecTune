import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

import { AudioEngine, PlayerStore } from '@core/player';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchFiltersPanel } from '@features/search/components/search-filters-panel/search-filters-panel';
import { SearchTopResultTrackCard } from '@features/search/components/search-top-result-track-card/search-top-result-track-card';
import { SearchTrackCard } from '@features/search/components/search-track-card/search-track-card';
import { DurationFilter, SearchFilters } from '@features/search/interfaces/search-filters';
import { SearchApi } from '@features/search/services/search-api';
import { mapDurationToApiParameters, mapApiParametersToDuration } from '@features/search/utils/duration-filter';
import { PageName } from '@shared/constants/page-name';

import { TuiButton, TuiIcon, TuiInput, TuiLoader } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-page',
  imports: [
    FormsModule,
    SearchFiltersPanel,
    SearchTrackCard,
    SearchTopResultTrackCard,
    TuiButton,
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

  protected readonly searchApi = inject(SearchApi);

  protected readonly audio = inject(AudioEngine);
  protected readonly playerStore = inject(PlayerStore);

  protected readonly pageName = PageName;

  protected readonly currentTrack = this.playerStore.currentTrack;

  protected readonly search = input('');
  protected readonly searchQuery = linkedSignal(() => this.search());

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
    { initialValue: this.search() },
  );

  constructor() {
    effect(() => {
      this.searchApi.query.set(this.debouncedQuery());
      this.searchApi.filters.set(this.filters());
    });
  }

  loadMore(): void {
    this.searchApi.offset.update((o) => o + this.searchApi.limit());
  }

  protected onPlay(track: SearchTrack): void {
    this.audio.playTrack(track);
  }

  protected onFiltersChange(filters: SearchFilters): void {
    this.filters.set(filters);
    this.syncUrl(this.debouncedQuery(), filters);
  }

  private filtersFromParameters(parameters: ParamMap): SearchFilters {
    const genres = parameters.get('fuzzytags')?.split('+').filter(Boolean) ?? [];
    const duration = parameters.get('duration') as DurationFilter | null;
    const sortBy = parameters.get('order') ?? undefined;

    const durationRange = mapDurationToApiParameters(duration);

    return {
      ...(genres.length > 0 && { genres }),
      ...durationRange,
      ...(sortBy && { sortBy: sortBy as SearchFilters['sortBy'] }),
    };
  }

  private syncUrl(query: string, filters: SearchFilters): void {
    const duration = mapApiParametersToDuration(filters);

    void this.router.navigate([], {
      queryParams: {
        search: query || null,
        fuzzytags: filters.genres?.join('+') ?? null,
        duration,
        order: filters.sortBy ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });
  }
}
