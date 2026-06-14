import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerBar } from '@core/player/components/player-bar/player-bar';
import { AudioEngine } from '@core/player/services/audio-engine';

@Component({
  selector: 'app-root',
  imports: [PlayerBar, RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('InjecTune');
  private readonly audioEngine = inject(AudioEngine);
}
