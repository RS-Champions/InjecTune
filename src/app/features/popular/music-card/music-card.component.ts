import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface MusicCardData {
  cover: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'a[app-music-card]',
  imports: [],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicCardComponent {
  public readonly data = input.required<MusicCardData>();
}
