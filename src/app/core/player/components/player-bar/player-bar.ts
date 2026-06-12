import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerQueue } from '@core/player/components/player-queue/player-queue';
import { RepeatMode } from '@core/player/interfaces/player-state';
import { AudioEngine } from '@core/player/services/audio-engine';
import { PlayerStore } from '@core/player/services/player.store';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiAppearance, TuiButton, TuiHint, TuiIcon, TuiPopup, TuiSlider } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

@Component({
  selector: 'app-player-bar',
  imports: [
    FormsModule,
    FormatDurationPipe,
    PlayerQueue,
    TuiAppearance,
    TuiButton,
    TuiHint,
    TuiIcon,
    TuiSlider,
    TuiDrawer,
    TuiPopup,
  ],
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBar {
  protected readonly playerStore = inject(PlayerStore);
  protected readonly audio = inject(AudioEngine);

  protected readonly queueOpen = signal(false);

  protected readonly isDragging = signal(false);
  protected readonly dragValue = signal(0);

  protected get progressValue(): number {
    return this.isDragging() ? this.dragValue() : this.playerStore.currentTime();
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

  protected toggleQueue(): void {
    this.queueOpen.update((value) => !value);
  }

  protected togglePlay(): void {
    if (this.playerStore.isPlaying()) {
      this.audio.pause();
    } else {
      this.audio.resume();
    }
  }

  protected toggleShuffle(): void {
    this.audio.setShuffle(!this.playerStore.shuffle());
  }

  protected toggleRepeat(): void {
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const current = this.playerStore.repeat();
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    this.audio.setRepeatMode(next);
  }

  protected get repeatIcon(): string {
    return this.playerStore.repeat() === 'one' ? '@tui.repeat-1' : '@tui.repeat';
  }

  protected get volumePercent(): number {
    return Math.round(this.playerStore.volume() * 100);
  }
}
