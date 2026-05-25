import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiLabel, TuiRadio } from '@taiga-ui/core';
import { TuiChevron, TuiChip, TuiSelect, TuiDataListWrapper } from '@taiga-ui/kit';

export type DurationFIlter = 'all' | 'short' | 'medium' | 'long';
export type SortBy = 'relevance' | 'popularity' | 'releasedate_desc' | 'name';

export interface SortOption {
  label: string;
  value: SortBy;
}
export interface SearchFilters {
  genres: string[];
  duration: DurationFIlter;
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
  protected readonly genres = ['Electronic', 'Synthwave', 'Ambient', 'Lo-Fi', 'Rock', 'Jazz', 'Pop'];
  protected readonly sortOptions: SortOption[] = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Release Date', value: 'releasedate_desc' },
    { label: 'Name', value: 'name' },
  ];

  protected readonly selectedGenres = signal<string[]>(['Electronic']);
  protected readonly duration = signal<DurationFIlter>('all');
  protected readonly selectedSort = signal<SortOption | null>(null);

  protected stringify: TuiStringHandler<SortOption> = (option) => option.label;

  protected isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  protected toggleGenre(genre: string): void {
    const current = this.selectedGenres();
    this.selectedGenres.set(current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre]);
  }

  protected setSort(option: SortOption): void {
    this.selectedSort.set(option);
  }
}
