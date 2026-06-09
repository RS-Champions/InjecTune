import { Injectable, computed, effect, signal } from '@angular/core';
import { PLAYER_STORAGE_KEYS, RepeatMode } from '@core/player';
import { BaseTrack } from '@shared/track/interfaces/base-track';

/**
 * Global Player Store Service
 *
 * Manages audio playback, queue state, and player UI state using Angular Signals.
 * Provides a single HTMLAudioElement instance for the entire application.
 * Persists queue and playback state to localStorage.
 *
 * Singleton service - survives route navigation.
 *
 * @example
 * ```typescript
 * constructor() {
 *   private playerStore = inject(PlayerStore);
 *
 *   playTrack(track: BaseTrack) {
 *     this.playerStore.playTrack(track);
 *   }
 *
 *   next() {
 *     this.playerStore.next();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class PlayerStore {
  // ============================================================================
  // State Signals
  // ============================================================================

  /** Queue of tracks to be played */
  readonly queue = signal<BaseTrack[]>([]);

  /** Current index in the queue */
  readonly queueIndex = signal<number>(0);

  /** Playback is active */
  readonly isPlaying = signal<boolean>(false);

  /** Current playback position in seconds */
  readonly currentTime = signal<number>(0);

  /** Total duration of current track in seconds */
  readonly duration = signal<number>(0);

  /** Volume level (0-1) */
  readonly volume = signal<number>(0.5);

  /** Repeat mode */
  readonly repeat = signal<RepeatMode>('off');

  /** Shuffle mode enabled */
  readonly shuffle = signal<boolean>(false);

  /** Track is buffering/loading */
  readonly isLoading = signal<boolean>(false);

  // ============================================================================
  // Computed Signals
  // ============================================================================

  /** Current track being played */
  readonly currentTrack = computed<BaseTrack | null>(() => this.queue()[this.queueIndex()] ?? null);

  /** Total number of tracks in queue */
  readonly queueLength = computed(() => this.queue().length);

  /** True if there's a next track available */
  readonly hasNext = computed(() => this.queueIndex() < this.queueLength() - 1);

  /** True if there's a previous track available */
  readonly hasPrevious = computed(() => this.queueIndex() > 0);

  /** Playback progress (0-1) */
  readonly progress = computed(() => {
    const duration = this.duration();
    return duration > 0 ? this.currentTime() / duration : 0;
  });

  // ============================================================================
  // Private State
  // ============================================================================
  /** Internal: used by AudioService for shuffle/unshuffle  toggling. Do not access directly from components. */
  readonly originalQueue = signal<BaseTrack[]>([]);

  constructor() {
    this.initializeState();
    this.setupStoragePersistence();
  }

  // ============================================================================
  // Initialization & Setup
  // ============================================================================

  /**
   * Initialize player state from localStorage
   */
  private initializeState(): void {
    try {
      const storedQueue = localStorage.getItem(PLAYER_STORAGE_KEYS.QUEUE);
      const storedIndex = localStorage.getItem(PLAYER_STORAGE_KEYS.QUEUE_INDEX);
      const storedTime = localStorage.getItem(PLAYER_STORAGE_KEYS.CURRENT_TIME);
      const storedVolume = localStorage.getItem(PLAYER_STORAGE_KEYS.VOLUME);
      const storedShuffle = localStorage.getItem(PLAYER_STORAGE_KEYS.SHUFFLE);
      const storedRepeat = localStorage.getItem(PLAYER_STORAGE_KEYS.REPEAT);

      if (storedQueue) {
        const queue = JSON.parse(storedQueue) as BaseTrack[];
        this.queue.set([...queue]);
        this.originalQueue.set([...queue]);
      }

      if (storedIndex) {
        this.queueIndex.set(Math.max(0, Number.parseInt(storedIndex, 10)));
      }

      if (storedTime) {
        this.currentTime.set(Math.max(0, Number.parseFloat(storedTime)));
      }

      if (storedVolume) {
        const vol = Math.max(0, Math.min(1, Number.parseFloat(storedVolume)));
        this.volume.set(vol);
      }

      if (storedShuffle) {
        this.shuffle.set(storedShuffle === 'true');
      }

      if (storedRepeat) {
        const repeat = storedRepeat as RepeatMode;
        if (['off', 'all', 'one'].includes(repeat)) {
          this.repeat.set(repeat);
        }
      }
    } catch (error) {
      console.error('[PlayerStore] Error initializing from localStorage:', error);
    }
  }

  /**
   * Setup effect for persisting state to localStorage
   */
  private setupStoragePersistence(): void {
    effect(() => {
      try {
        // always persist the ORIGINAL order, not the shuffled one
        const queueToPersist = this.originalQueue().length > 0 ? this.originalQueue() : this.queue();
        localStorage.setItem(PLAYER_STORAGE_KEYS.QUEUE, JSON.stringify(queueToPersist));
        localStorage.setItem(PLAYER_STORAGE_KEYS.QUEUE_INDEX, String(this.queueIndex()));
        localStorage.setItem(PLAYER_STORAGE_KEYS.VOLUME, String(this.volume()));
        localStorage.setItem(PLAYER_STORAGE_KEYS.SHUFFLE, String(this.shuffle()));
        localStorage.setItem(PLAYER_STORAGE_KEYS.REPEAT, this.repeat());
      } catch (error) {
        console.error('[PlayerStore] Error persisting to localStorage:', error);
      }
    });
  }
}
