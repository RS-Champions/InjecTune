import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Equalizer } from '@shared/equalizer/equalizer';

interface MusicCardData {
  cover: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-music-card',
  imports: [Equalizer],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicCardComponent {
  public readonly data = input.required<MusicCardData>();
  isActive = input.required<boolean>();
}
