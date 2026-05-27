import { SearchTrack } from './search-track';

export interface SearchResultPage {
  searchedTracks: SearchTrack[];
  totalCount: number;
}
