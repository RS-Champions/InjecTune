import { Directive, input, output } from '@angular/core';

@Directive()
export class Track<T> {
  readonly track = input.required<T>();

  readonly isPlaying = input(false);

  readonly playTrack = output<T>();
  readonly pauseTrack = output<T>();

  onPlay(): void {
    this.playTrack.emit(this.track());
  }

  onPause(): void {
    this.pauseTrack.emit(this.track());
  }
}
