import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiscoverService } from '@features/discover/services/discover.service';
import { MusicCardComponent } from '@shared/music-card/music-card.component';

@Component({
  selector: 'app-discover-page',
  imports: [MusicCardComponent],
  templateUrl: './discover-page.html',
  styleUrl: './discover-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage {
  private readonly store = inject(DiscoverService);

  protected readonly popularTracks = computed(() => {
    const popularTracks = this.store.popularTracks();
    return popularTracks.map((track) => {
      return {
        cover: track.coverUrl,
        title: track.title,
        subtitle: track.count.toString(),
        id: track.id,
      };
    });
  });

  protected readonly currentTrackId = this.store.currentTrackId.asReadonly();

  protected onClickMusicCard(index: number) {
    this.store.playTrack(this.popularTracks()[index].id);
  }
}
