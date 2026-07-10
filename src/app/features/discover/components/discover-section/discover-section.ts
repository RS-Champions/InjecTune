import { Component, computed, input, inject, Resource } from '@angular/core';
import { AudioEngine, PlayerStore } from '@core/player';
import { MusicCard } from '@shared/components/music-card/music-card';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiLoader } from '@taiga-ui/core';

interface DiscoverSectionData {
  title: string;
  resource: Resource<JamendoResponse<BaseTrack> | undefined>;
}

@Component({
  selector: 'app-discover-section',
  imports: [FormatDurationPipe, MusicCard, TuiLoader],
  templateUrl: './discover-section.html',
  styleUrl: './discover-section.less',
})
export class DiscoverSection {
  public readonly data = input.required<DiscoverSectionData>();
  protected readonly audioEngine = inject(AudioEngine);
  protected readonly playerStore = inject(PlayerStore);
  protected readonly resource = computed(() => this.data().resource);
  protected readonly title = computed(() => this.data().title);
}
