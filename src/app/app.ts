import { Component, signal } from '@angular/core';
import { TrackCardComponent } from './components/track-card/track-card';
import { Track } from './models/track.model';
import { MOCK_TRACKS } from './mock/mock-tracks';

@Component({
  selector: 'app-root',
  imports: [TrackCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  tracks = MOCK_TRACKS;
  playingTrackId = signal<string | null>(null);

  onPlay(track: Track): void {
    this.playingTrackId.set(this.playingTrackId() === track.id ? null : track.id);
  }

  isPlaying(track: Track): boolean {
    return this.playingTrackId() === track.id;
  }
}
