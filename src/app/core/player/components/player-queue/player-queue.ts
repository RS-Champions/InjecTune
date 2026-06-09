import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { PlayerQueueItem } from '../player-queue-item/player-queue-item';
import { PlayerStore } from '@core/player/services/player.store';
import { AudioEngine } from '@core/player/services/audio-engine';

@Component({
  selector: 'app-player-queue',
  imports: [PlayerQueueItem],
  templateUrl: './player-queue.html',
  styleUrl: './player-queue.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerQueue {
  protected readonly store = inject(PlayerStore);
  protected readonly audio = inject(AudioEngine);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly closeQueuePanel = output<void>(); // eslint-disable-line @typescript-eslint/no-invalid-void-type

  protected selectTrack(index: number): void {
    this.audio.playTrackAt(index);
  }
}
