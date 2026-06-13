import { inject, Injectable } from '@angular/core';
import { PLAYER_STORAGE_KEYS, PlayerStore } from '@core/player';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { isRepeatMode, shuffleArray } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AudioEngine {
  private readonly playerStore = inject(PlayerStore);
  private readonly audioElement: HTMLAudioElement = new Audio();

  constructor() {
    this.audioElement.crossOrigin = null;
    this.setupListeners();
    this.audioElement.volume = this.playerStore.volume();

    // re-apply shuffle on reload if it was active in previous session
    if (this.playerStore.shuffle()) {
      this.playerStore.shuffle.set(false);
      this.setShuffle(true);
    }

    // restore position from last session
    const savedTime = this.playerStore.currentTime();
    if (savedTime > 0) {
      // set after src loads — can't seek before loadedmetadata
      this.audioElement.addEventListener(
        'loadedmetadata',
        () => {
          this.audioElement.currentTime = savedTime;
        },
        { once: true },
      );
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(PLAYER_STORAGE_KEYS.CURRENT_TIME, String(this.audioElement.currentTime));
    });
  }

  // ============================================================================
  // Playback Methods
  // ============================================================================

  /**
   * Play a single track
   * @param track Track to play
   */
  playTrack(track: BaseTrack): void {
    this.playQueue([track], 0);
  }

  /**
   * Play a single track from existing queue
   * @param index Index of track in the queue to play
   */
  playTrackAt(index: number): void {
    const queue = this.playerStore.queue();

    if (index < 0 || index >= queue.length) {
      return;
    }

    this.playerStore.queueIndex.set(index);

    this.loadCurrentTrack();
    this.play();
  }

  /**
   * Play a queue of tracks starting at a specific index
   * @param tracks Array of tracks to play
   * @param startIndex Starting index (default: 0)
   */
  playQueue(queue: BaseTrack[], startIndex = 0): void {
    if (queue.length === 0) {
      console.warn('[AudioEngine] Attempt to play empty queue');
      return;
    }

    this.playerStore.queue.set([...queue]);
    this.playerStore.originalQueue.set([...queue]);

    // re-apply shuffle if it was active in previous session
    if (this.playerStore.shuffle()) {
      this.playerStore.shuffle.set(false);
      this.setShuffle(true);
    }

    const validIndex = Math.max(0, Math.min(startIndex, queue.length - 1));
    this.playerStore.queueIndex.set(validIndex);

    this.loadCurrentTrack();
    this.play();
  }

  /**
   * Play next track in queue
   */
  next(): void {
    if (!this.playerStore.hasNext()) {
      // No next track
      if (this.playerStore.repeat() === 'all') {
        this.playerStore.queueIndex.set(0);
        this.loadCurrentTrack();
        this.play();
      } else {
        this.stop();
      }
      return;
    }

    this.playerStore.queueIndex.update((index) => index + 1);
    this.loadCurrentTrack();
    this.play();
  }

  /**
   * Play previous track in queue
   */
  previous(): void {
    if (!this.playerStore.hasPrevious()) {
      // No previous track, restart current
      this.seek(0);
      return;
    }

    this.playerStore.queueIndex.update((index) => index - 1);
    this.loadCurrentTrack();
    this.play();
  }

  /**
   * Pause playback
   */
  pause(): void {
    this.audioElement.pause();
    localStorage.setItem(PLAYER_STORAGE_KEYS.CURRENT_TIME, String(this.audioElement.currentTime));
  }

  /**
   * Resume playback
   */
  resume(): void {
    const audio = this.audioElement;
    if (audio.src) {
      audio.play().catch((error: unknown) => {
        console.error('[AudioEngine] Error resuming playback:', error);
      });
    }
  }

  /**
   * Stop playback and reset to beginning
   */
  stop(): void {
    this.pause();
    this.seek(0);
  }

  /**
   * Seek to a specific time in seconds
   * @param seconds Time to seek to (clamped between 0 and duration)
   */
  seek(seconds: number): void {
    const audio = this.audioElement;
    const duration = this.playerStore.duration();
    const validTime = Math.max(0, Math.min(seconds, duration));

    audio.currentTime = validTime;
    this.playerStore.currentTime.set(validTime);
  }

  /**
   * Set volume level
   * @param level Volume level (0-1)
   */
  setVolume(level: number): void {
    const validVolume = Math.max(0, Math.min(1, level));
    const audio = this.audioElement;

    audio.volume = validVolume;
    this.playerStore.volume.set(validVolume);
  }

  /**
   * Enable/disable shuffle mode
   * @param enabled True to enable shuffle
   */
  setShuffle(enabled: boolean): void {
    const wasEnabled = this.playerStore.shuffle();
    this.playerStore.shuffle.set(enabled);

    if (enabled && !wasEnabled) {
      const queue = this.playerStore.queue();
      if (queue.length === 0) return;

      const currentIndex = this.playerStore.queueIndex();
      const currentTrack = queue[currentIndex];
      const otherTracks = queue.filter((_, index) => index !== currentIndex);
      const shuffled = shuffleArray([...otherTracks]);

      this.playerStore.queue.set([currentTrack, ...shuffled]);
      this.playerStore.queueIndex.set(0);
      this.playerStore.originalQueue.set([...queue]);
    } else if (!enabled && wasEnabled) {
      const currentTrack = this.playerStore.currentTrack();
      if (currentTrack && this.playerStore.originalQueue().length > 0) {
        const newIndex = this.playerStore.originalQueue().findIndex((t) => t.id === currentTrack.id);
        if (newIndex !== -1) {
          this.playerStore.queue.set([...this.playerStore.originalQueue()]);
          this.playerStore.queueIndex.set(newIndex);
        }
      }
    }
  }

  /**
   * Set repeat mode
   * @param mode Repeat mode: 'off', 'all', or 'one'
   */
  setRepeatMode(mode: string): void {
    if (!isRepeatMode(mode)) {
      console.warn(`[AudioEngine] Invalid repeat mode: ${mode}`);
      return;
    }
    this.playerStore.repeat.set(mode);
  }

  // ============================================================================
  // Initialization & Setup
  // ============================================================================

  /**
   * Setup audio element event listeners
   */
  private setupListeners(): void {
    // Track time update
    this.audioElement.addEventListener('timeupdate', () => {
      if (!Number.isNaN(this.audioElement.currentTime)) {
        this.playerStore.currentTime.set(this.audioElement.currentTime);
      }
    });

    // Track duration change
    this.audioElement.addEventListener('durationchange', () => {
      if (!Number.isNaN(this.audioElement.duration)) {
        this.playerStore.duration.set(this.audioElement.duration);
      }
    });

    // Track ends - handle repeat/next
    this.audioElement.addEventListener('ended', () => {
      this.handleTrackEnd();
    });

    // Loading states
    this.audioElement.addEventListener('loadstart', () => {
      this.playerStore.isLoading.set(true);
    });
    this.audioElement.addEventListener('canplay', () => {
      this.playerStore.isLoading.set(false);
    });
    this.audioElement.addEventListener('playing', () => {
      this.playerStore.isPlaying.set(true);
    });
    this.audioElement.addEventListener('pause', () => {
      this.playerStore.isPlaying.set(false);
    });

    this.audioElement.addEventListener('error', () => {
      this.playerStore.isLoading.set(false);
      console.error('[PlayerStore] Audio element error:', this.audioElement.error);
    });
  }

  // ============================================================================
  // Private Helpers
  // ============================================================================

  /**
   * Load a track into the audio element without playing
   */
  private loadTrack(track: BaseTrack): void {
    const audio = this.audioElement;

    if (!track.audio) {
      console.error('[AudioEngine] Track has no audio URL:', track);
      return;
    }

    audio.src = track.audio;
    audio.volume = this.playerStore.volume();

    this.playerStore.currentTime.set(0);
    this.playerStore.duration.set(0);
  }

  /**
   * Load and play current track from queue
   */
  private loadCurrentTrack(): void {
    const queue = this.playerStore.queue();
    const index = this.playerStore.queueIndex();

    if (queue.length === 0 || index < 0 || index >= queue.length) {
      console.warn('[AudioEngine] Invalid queue index:', index);
      return;
    }

    this.loadTrack(queue[index]);
  }

  /**
   * Internal play method
   */
  private play(): void {
    const audio = this.audioElement;
    if (audio.src) {
      audio.play().catch((error: unknown) => {
        console.error('[AudioEngine] Error playing track:', error);
      });
    }
  }

  /**
   * Handle track end event
   */
  private handleTrackEnd(): void {
    const repeatMode = this.playerStore.repeat();

    if (repeatMode === 'one') {
      this.seek(0);
      this.play();
    } else if (repeatMode === 'all' || this.playerStore.hasNext()) {
      this.next();
    } else {
      this.stop();
    }
  }
}
