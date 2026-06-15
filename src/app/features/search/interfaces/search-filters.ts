export type DurationFilter = null | 'short' | 'medium' | 'long';
export type SortBy = 'relevance' | 'popularity_total' | 'releasedate_desc' | 'name';

export interface SearchFilters {
  genres?: string[];
  durationMin?: number;
  durationMax?: number;
  sortBy?: SortBy;
}
