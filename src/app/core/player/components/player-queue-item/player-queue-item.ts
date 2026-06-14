import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-player-queue-item',
  imports: [FormatDurationPipe, TuiIcon],
  templateUrl: './player-queue-item.html',
  styleUrl: './player-queue-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerQueueItem {
  readonly track = input.required<BaseTrack>();
  readonly index = input.required<number>();
  readonly isActive = input(false);

  readonly selectTrack = output();
}
