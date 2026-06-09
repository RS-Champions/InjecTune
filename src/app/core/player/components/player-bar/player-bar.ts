import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerQueue } from '@core/player/components/player-queue/player-queue';
import { RepeatMode } from '@core/player/interfaces/player-state';
import { AudioEngine } from '@core/player/services/audio-engine';
import { PlayerStore } from '@core/player/services/player.store';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiAppearance, TuiButton, TuiHint, TuiIcon, TuiSlider } from '@taiga-ui/core';

@Component({
  selector: 'app-player-bar',
  imports: [FormsModule, FormatDurationPipe, PlayerQueue, TuiAppearance, TuiButton, TuiHint, TuiIcon, TuiSlider],
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBar {
  protected readonly store = inject(PlayerStore);
  protected readonly audio = inject(AudioEngine);

  protected readonly queueOpen = signal(false);
  protected toggleQueue(): void {
    this.queueOpen.update((value) => !value);
  }

  // local signal to avoid slider fighting timeupdate while dragging
  protected readonly isDragging = signal(false);
  protected readonly dragValue = signal(0);

  protected get progressValue(): number {
    return this.isDragging() ? this.dragValue() : this.store.currentTime();
  }

  protected onProgressInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.isDragging.set(true);
    this.dragValue.set(value);
  }

  protected onProgressChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.audio.seek(value);
    this.isDragging.set(false);
  }

  protected onVolumeChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.audio.setVolume(value / 100);
  }

  protected togglePlay(): void {
    if (this.store.isPlaying()) {
      this.audio.pause();
    } else {
      this.audio.resume();
    }
  }

  protected toggleShuffle(): void {
    this.audio.setShuffle(!this.store.shuffle());
  }

  protected toggleRepeat(): void {
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const current = this.store.repeat();
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    this.audio.setRepeatMode(next);
  }

  protected get repeatIcon(): string {
    return this.store.repeat() === 'one' ? '@tui.repeat-1' : '@tui.repeat';
  }

  protected get volumePercent(): number {
    return Math.round(this.store.volume() * 100);
  }
}
