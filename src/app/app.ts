import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioEngine } from '@core/player/services/audio-engine';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('InjecTune');
  private readonly audioEngine = inject(AudioEngine);
}
