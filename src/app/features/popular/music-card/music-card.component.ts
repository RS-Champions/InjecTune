import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface MusicCardData {
  cover: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-music-card',
  imports: [],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-music-card',
  },
})
export class MusicCardComponent {
  public readonly data = input.required<MusicCardData>();
  public readonly cardClick = output();

  protected onCardClick(): void {
    this.cardClick.emit();
  }
}
