import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DurationFilter, SearchFilters, SortBy } from '@features/search/interfaces/search-filters';
import { mapApiParametersToDuration, mapDurationToApiParameters } from '@features/search/utils/duration-filter';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiButton, TuiHint, TuiIcon, TuiLabel, TuiRadio } from '@taiga-ui/core';
import { TuiChevron, TuiChip, TuiSelect, TuiDataListWrapper } from '@taiga-ui/kit';

export interface SortOption {
  label: string;
  value: SortBy;
}
export interface SearchFilterState {
  genres: string[];
  duration: DurationFilter;
  sortBy: SortBy;
}
@Component({
  selector: 'app-search-filters-panel',
  imports: [
    FormsModule,
    TuiButton,
    TuiChevron,
    TuiChip,
    TuiHint,
    TuiDataListWrapper,
    TuiIcon,
    TuiLabel,
    TuiRadio,
    TuiSelect,
  ],
  templateUrl: './search-filters-panel.html',
  styleUrl: './search-filters-panel.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersPanel {
  readonly initialFilters = input<SearchFilters>({});
  readonly filtersChange = output<SearchFilters>();

  protected readonly genres = ['Electronic', 'Synthwave', 'Ambient', 'Funk', 'Lo-Fi', 'Rock', 'Jazz', 'Pop'];
  protected readonly sortOptions: SortOption[] = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Release Date', value: 'releasedate_desc' },
    { label: 'Name', value: 'name' },
  ];

  protected readonly selectedGenres = signal<string[]>([]);
  protected readonly duration = signal<DurationFilter>(null);
  protected readonly selectedSort = signal<SortOption | null>(null);

  constructor() {
    effect(() => {
      const initial = this.initialFilters();

      this.selectedGenres.set(initial.genres ?? []);
      this.duration.set(mapApiParametersToDuration(initial));

      const matchedSort = initial.sortBy == null ? null : (this.sortOptions.find((o) => o.value === initial.sortBy) ?? null);

      this.selectedSort.set(matchedSort);
    });
  }

  protected stringify: TuiStringHandler<SortOption> = (option) => option.label;

  protected isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre.toLowerCase());
  }

  protected toggleGenre(genre: string): void {
    const normalized = genre.toLowerCase();
    const current = this.selectedGenres();
    this.selectedGenres.set(
      current.includes(normalized) ? current.filter((g) => g !== normalized) : [...current, normalized],
    );
    this.emitFilters();
  }

  protected setDuration(value: DurationFilter): void {
    this.duration.set(value);
    this.emitFilters();
  }

  protected setSort(option: SortOption): void {
    this.selectedSort.set(option);
    this.emitFilters();
  }

  protected clearFilters(): void {
    this.selectedGenres.set([]);
    this.duration.set(null);
    this.selectedSort.set(null);

    this.emitFilters();
  }

  private toApiFilters(): SearchFilters {
    const genres = this.selectedGenres();
    const sortBy = this.selectedSort()?.value;

    const duration = this.duration();
    const range = mapDurationToApiParameters(duration);

    return {
      ...(genres.length > 0 && { genres }),
      ...range,
      ...(sortBy && { sortBy }),
    };
  }

  private emitFilters(): void {
    this.filtersChange.emit(this.toApiFilters());
  }
}
