import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DiscoverSection } from '@features/discover/components/discover-section/discover-section';
import { DiscoverApi } from '@features/discover/services/discover-api';
import { GenreTags } from '@shared/components/genre-tags/genre-tags';

@Component({
  selector: 'app-discover-page',
  imports: [DiscoverSection, GenreTags],
  templateUrl: './discover-page.html',
  styleUrl: './discover-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage {
  private readonly store = inject(DiscoverApi);
  private readonly popularTracksResource = this.store.popularTracksResource;
  private readonly releaseTracksResource = this.store.releaseTracksResource;

  protected popularTracksSectionData = computed(() => ({
    title: 'Popular tracks',
    resource: this.popularTracksResource,
  }));

  protected releaseTracksSectionData = computed(() => ({
    title: 'Release tracks',
    resource: this.releaseTracksResource,
  }));
}
