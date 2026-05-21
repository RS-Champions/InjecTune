import { Component, computed, inject, input, output, Resource } from '@angular/core';
import { TrackResponse } from '@features/discover/interfaces/track';
import { TuiLoader } from '@taiga-ui/core';
import { MusicCardComponent } from '@shared/music-card/music-card.component';
import { DurationPipe } from '@shared/pipes/duration-pipe';

interface DiscoverSectionData {
  title: string;
  playingTrackId: string;
  resource: Resource<TrackResponse | undefined>;
}

@Component({
  selector: 'app-discover-section',
  imports: [TuiLoader, MusicCardComponent],
  providers: [DurationPipe],
  templateUrl: './discover-section.html',
  styleUrl: './discover-section.less',
})
export class DiscoverSection {
  public readonly data = input.required<DiscoverSectionData>();
  public readonly trackToggled = output<string>();

  protected readonly resource = computed(() => this.data().resource);
  protected readonly playingTrackId = computed(() => this.data().playingTrackId);
  protected readonly title = computed(() => this.data().title);

  private durationPipe = inject(DurationPipe);

  protected onClickMusicCard(index: number) {
    const value = this.resource().value()?.results;
    if (value) {
      this.trackToggled.emit(value[index].id);
    }
  }

  protected generateSubtitle(artist_name?: string, duration?: number) {
    const formattedDuration = duration ? this.durationPipe.transform(duration) : undefined;

    return [artist_name, formattedDuration].filter((field) => field !== undefined).join(' • ');
  }
}
