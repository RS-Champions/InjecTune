import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('InjecTune');
}
