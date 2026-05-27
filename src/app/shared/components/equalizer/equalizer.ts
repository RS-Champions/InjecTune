import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  imports: [],
  templateUrl: './equalizer.html',
  styleUrl: './equalizer.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Equalizer {}
