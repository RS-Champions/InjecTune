import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiscoverSection } from '@features/discover/components/discover-section/discover-section';
import { DiscoverStore } from '@features/discover/services/discover-store';

@Component({
  selector: 'app-discover-page',
  imports: [DiscoverSection],
  templateUrl: './discover-page.html',
  styleUrl: './discover-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage {
  private readonly store = inject(DiscoverStore);
  private readonly popularTracksResource = this.store.popularTracksResource;
  private readonly releaseTracksResource = this.store.releaseTracksResource;
  private readonly currentTrackId = this.store.currentTrackId.asReadonly();

  protected popularTracksSectionData = computed(() => {
    return {
      title: 'Popular tracks',
      playingTrackId: this.currentTrackId(),
      resource: this.popularTracksResource,
    };
  });

  protected releaseTracksSectionData = computed(() => {
    return {
      title: 'Release tracks',
      playingTrackId: this.currentTrackId(),
      resource: this.releaseTracksResource,
    };
  });

  protected toggleTrack(id: string) {
    this.store.toggleTrack(id);
  }
}
