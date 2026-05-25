import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DurationFilter, SearchFilters, SortBy } from '@features/search/interfaces/search-filters';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiLabel, TuiRadio } from '@taiga-ui/core';
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
  imports: [FormsModule, TuiButton, TuiChevron, TuiChip, TuiDataListWrapper, TuiIcon, TuiLabel, TuiRadio, TuiSelect],
  templateUrl: './search-filters-panel.html',
  styleUrl: './search-filters-panel.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersPanel {
  readonly filtersChange = output<SearchFilters>();

  protected readonly genres = ['Electronic', 'Synthwave', 'Ambient', 'Lo-Fi', 'Rock', 'Jazz', 'Pop'];
  protected readonly sortOptions: SortOption[] = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Release Date', value: 'releasedate_desc' },
    { label: 'Name', value: 'name' },
  ];

  protected readonly selectedGenres = signal<string[]>([]);
  protected readonly duration = signal<DurationFilter>(null);
  protected readonly selectedSort = signal<SortOption | null>(null);

  protected stringify: TuiStringHandler<SortOption> = (option) => option.label;

  protected isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  protected toggleGenre(genre: string): void {
    const current = this.selectedGenres();
    this.selectedGenres.set(current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre]);
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

  private toApiFilters(): SearchFilters {
    const genres = this.selectedGenres();
    const sortBy = this.selectedSort()?.value;

    const durationRanges: Record<NonNullable<DurationFIlter>, { min?: number; max?: number }> = {
      short: { max: 180 },
      medium: { min: 180, max: 300 },
      long: { min: 300 },
    };

    const duration = this.duration();
    const range = duration ? durationRanges[duration] : {};

    return {
      ...(genres.length > 0 && { genres }),
      ...(range.min !== undefined && { durationMin: range.min }),
      ...(range.max !== undefined && { durationMax: range.max }),
      ...(sortBy && { sortBy }),
    };
  }

  private emitFilters(): void {
    this.filtersChange.emit(this.toApiFilters());
  }
}
