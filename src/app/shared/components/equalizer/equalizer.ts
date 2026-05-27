import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  imports: [],
  templateUrl: './equalizer.html',
  styleUrl: './equalizer.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Equalizer {}
