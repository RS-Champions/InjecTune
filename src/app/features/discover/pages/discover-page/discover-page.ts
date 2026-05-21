import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DiscoverStore } from '@features/discover/services/discover-store';
import { MusicCardComponent } from '@shared/music-card/music-card.component';
import { TuiLoader } from '@taiga-ui/core';

@Component({
  selector: 'app-discover-page',
  imports: [MusicCardComponent, TuiLoader],
  templateUrl: './discover-page.html',
  styleUrl: './discover-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage {
  private readonly store = inject(DiscoverStore);

  protected readonly popularTracksResource = this.store.popularTracksResource;
  protected readonly currentTrackId = this.store.currentTrackId.asReadonly();

  protected onClickMusicCard(index: number) {
    const value = this.popularTracksResource.value()?.results;
    if (value) {
      this.store.playTrack(value[index].id);
    }
  }
}
