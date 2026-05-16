import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly title = signal('InjecTune');
}
