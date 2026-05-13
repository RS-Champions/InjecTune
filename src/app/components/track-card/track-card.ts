import { Component, input, output } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-card',
  imports: [],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
})
export class TrackCardComponent {
  track = input.required<Track>();
  isPlaying = input<boolean>(false);
  trackPlay = output<Track>();

  onPlay(): void {
    this.trackPlay.emit(this.track());
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m)}:${s.toString().padStart(2, '0')}`;
  }

  formatPlayCount(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  }
}