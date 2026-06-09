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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly selectTrack = output<void>(); // eslint-disable-line @typescript-eslint/no-invalid-void-type
}
