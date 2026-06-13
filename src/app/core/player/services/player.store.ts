import { Injectable, computed, effect, signal } from '@angular/core';
import { RepeatMode } from '@core/player';
import { PlayerStorageKeys } from '@shared/constants/player-storage-keys';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { isRepeatMode } from '@shared/utils';

/**
 * Global Player Store Service
 */
@Injectable({
  providedIn: 'root',
})
export class PlayerStore {
  // ============================================================================
  // State Signals
  // ============================================================================

  readonly queue = signal<BaseTrack[]>([]);
  readonly queueIndex = signal<number>(0);
  readonly isPlaying = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly volume = signal<number>(0.5);
  readonly repeat = signal<RepeatMode>('off');
  readonly shuffle = signal<boolean>(false);
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
      const storedQueue = localStorage.getItem(PlayerStorageKeys.QUEUE);
      const storedIndex = localStorage.getItem(PlayerStorageKeys.QUEUE_INDEX);
      const storedTime = localStorage.getItem(PlayerStorageKeys.CURRENT_TIME);
      const storedVolume = localStorage.getItem(PlayerStorageKeys.VOLUME);
      const storedShuffle = localStorage.getItem(PlayerStorageKeys.SHUFFLE);
      const storedRepeat = localStorage.getItem(PlayerStorageKeys.REPEAT);

      if (storedQueue) {
        const queue = JSON.parse(storedQueue) as BaseTrack[];
        this.queue.set([...queue]);
        this.originalQueue.set([...queue]);
      }

      const parsedIndex = this.parseStoredNumber(storedIndex, 0, Infinity, false);
      if (parsedIndex !== null) {
        this.queueIndex.set(parsedIndex);
      }

      const parsedTime = this.parseStoredNumber(storedTime, 0);
      if (parsedTime !== null) {
        this.currentTime.set(parsedTime);
      }

      const parsedVolume = this.parseStoredNumber(storedVolume, 0, 1);
      if (parsedVolume !== null) {
        this.volume.set(parsedVolume);
      }

      if (storedShuffle) {
        this.shuffle.set(storedShuffle === 'true');
      }

      if (storedRepeat && isRepeatMode(storedRepeat)) {
        this.repeat.set(storedRepeat);
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
        localStorage.setItem(PlayerStorageKeys.QUEUE, JSON.stringify(queueToPersist));
        localStorage.setItem(PlayerStorageKeys.QUEUE_INDEX, String(this.queueIndex()));
        localStorage.setItem(PlayerStorageKeys.VOLUME, String(this.volume()));
        localStorage.setItem(PlayerStorageKeys.SHUFFLE, String(this.shuffle()));
        localStorage.setItem(PlayerStorageKeys.REPEAT, this.repeat());
      } catch (error) {
        console.error('[PlayerStore] Error persisting to localStorage:', error);
      }
    });
  }

  /**
   * Set a valid value of number type
   */
  private parseStoredNumber(stored: string | null, min: number, max = Infinity, isFloat = true): number | null {
    if (!stored) return null;

    const parsed = isFloat ? Number.parseFloat(stored) : Number.parseInt(stored, 10);

    if (!Number.isFinite(parsed)) return null;

    return Math.max(min, Math.min(max, parsed));
  }
}
