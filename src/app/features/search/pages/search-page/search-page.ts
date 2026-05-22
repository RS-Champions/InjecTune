import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SearchTrack } from '@features/search/interfaces/search-track';
import { SearchMockService, SearchResultPage } from '@features/search/services/search-mock.service';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { SearchTrackCard } from "@features/search/components/search-track-card/search-track-card";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [AsyncPipe, SearchTrackCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly service = inject(SearchMockService);

  protected readonly currentTrack = signal<SearchTrack | null>(null);
  protected readonly searchTracks: Observable<SearchResultPage> = this.service.search();

  onPlay(track: SearchTrack): void {
    if (!this.currentTrack() || this.currentTrack()!.id !== track.id) {
      this.currentTrack.set(track);
    }
  }

  onPause(track: SearchTrack): void {
    if (this.currentTrack() && this.currentTrack()!.id === track.id) {
      this.currentTrack.set(null);
    }
  }
}
