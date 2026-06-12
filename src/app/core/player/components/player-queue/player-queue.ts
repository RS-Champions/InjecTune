import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { PlayerQueueItem } from '../player-queue-item/player-queue-item';
import { PlayerStore } from '@core/player/services/player.store';
import { AudioEngine } from '@core/player/services/audio-engine';
import { TuiButton, TuiHint } from '@taiga-ui/core';

@Component({
  selector: 'app-player-queue',
  imports: [PlayerQueueItem, TuiButton, TuiHint],
  templateUrl: './player-queue.html',
  styleUrl: './player-queue.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerQueue {
  protected readonly playerStore = inject(PlayerStore);
  protected readonly audio = inject(AudioEngine);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly closeQueuePanel = output<void>(); // eslint-disable-line @typescript-eslint/no-invalid-void-type

  protected selectTrack(index: number): void {
    this.audio.playTrackAt(index);
  }
}
