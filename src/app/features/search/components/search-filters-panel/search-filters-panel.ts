import { Component, signal } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiChip } from '@taiga-ui/kit';

@Component({
  selector: 'app-search-filters-panel',
  imports: [TuiButton, TuiChip, TuiIcon],
  templateUrl: './search-filters-panel.html',
  styleUrl: './search-filters-panel.less',
})
export class SearchFiltersPanel {
  protected readonly genres = ['Electronic', 'Synthwave', 'Ambient', 'Lo-Fi'];

  protected readonly selectedGenres = signal<string[]>(['Electronic']);

  toggleGenre(genre: string): void {
    const current = this.selectedGenres();

    this.selectedGenres.set(current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre]);
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }
}
