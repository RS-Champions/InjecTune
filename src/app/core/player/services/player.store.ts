import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { RepeatMode } from '@core/player';
import { LOCAL_STORAGE } from '@core/tokens/browser.tokens';
import { LibraryApi } from '@features/library/services/library.api';
import { PlayerStorageKeys } from '@shared/constants/player-storage-keys';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { isRepeatMode } from '@shared/utils';

/** Don't log a second recently-played row for the same track within this window. */
const RECENTLY_PLAYED_DEDUPE_WINDOW_MS = 60_000;

/**
 * Global Player Store Service
 */
@Injectable({
  providedIn: 'root',
})
export class PlayerStore {
  private readonly storage = inject(LOCAL_STORAGE);
  private readonly libraryApi = inject(LibraryApi);
  private readonly authService = inject(AuthServiceAbstract);

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

  /**
   * Non-null only when a track is genuinely playing — null when the store
   * is restored from localStorage without the user pressing play.
   * Used by setupRecentlyPlayedRecording to avoid false history entries on
   * page reload.
   */
  private readonly playSessionKey = computed(() => {
    const track = this.currentTrack();
    const playing = this.isPlaying();
    return track && playing ? track.id : null;
  });

  /** Recently-played dedupe bookkeeping — not persisted, resets on reload (acceptable). */
  private lastLoggedTrackId: string | null = null;
  private lastLoggedAt = 0;

  /** Tracks whose identity currently owns the persisted state, to detect login/logout/switch. */
  private lastUserId: string | null | undefined = undefined;

  constructor() {
    this.setupUserChangeReset();
    this.initializeState();
    this.setupStoragePersistence();
    this.setupRecentlyPlayedRecording();
  }

  // ============================================================================
  // Initialization & Setup
  // ============================================================================

  /**
   * Wipes queue/playback state whenever the authenticated identity changes
   * (login, logout, or switching accounts on a shared browser). Runs before
   * initializeState() so a fresh login never restores a previous user's
   * leftover localStorage.
   */
  private setupUserChangeReset(): void {
    effect(() => {
      const userId = this.authService.currentUser()?.id ?? null;

      if (this.lastUserId === undefined) {
        this.lastUserId = userId;
        return;
      }

      if (userId === this.lastUserId) return;

      this.lastUserId = userId;
      this.resetForUserChange();
    });
  }

  private resetForUserChange(): void {
    this.queue.set([]);
    this.originalQueue.set([]);
    this.queueIndex.set(0);
    this.isPlaying.set(false);
    this.currentTime.set(0);
    this.duration.set(0);
    this.lastLoggedTrackId = null;
    this.lastLoggedAt = 0;

    try {
      this.storage.removeItem(PlayerStorageKeys.QUEUE);
      this.storage.removeItem(PlayerStorageKeys.QUEUE_INDEX);
      this.storage.removeItem(PlayerStorageKeys.CURRENT_TIME);
    } catch (error) {
      console.error('[PlayerStore] Error clearing localStorage on user change:', error);
    }
  }

  /**
   * Initialize player state from localStorage
   */
  private initializeState(): void {
    try {
      const storedQueue = this.storage.getItem(PlayerStorageKeys.QUEUE);
      const storedIndex = this.storage.getItem(PlayerStorageKeys.QUEUE_INDEX);
      const storedTime = this.storage.getItem(PlayerStorageKeys.CURRENT_TIME);
      const storedVolume = this.storage.getItem(PlayerStorageKeys.VOLUME);
      const storedShuffle = this.storage.getItem(PlayerStorageKeys.SHUFFLE);
      const storedRepeat = this.storage.getItem(PlayerStorageKeys.REPEAT);

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
        const queueToPersist = this.originalQueue().length > 0 ? this.originalQueue() : this.queue();
        this.storage.setItem(PlayerStorageKeys.QUEUE, JSON.stringify(queueToPersist));
        this.storage.setItem(PlayerStorageKeys.QUEUE_INDEX, String(this.queueIndex()));
        this.storage.setItem(PlayerStorageKeys.VOLUME, String(this.volume()));
        this.storage.setItem(PlayerStorageKeys.SHUFFLE, String(this.shuffle()));
        this.storage.setItem(PlayerStorageKeys.REPEAT, this.repeat());
      } catch (error) {
        console.error('[PlayerStore] Error persisting to localStorage:', error);
      }
    });
  }

  /**
   * Records a recently-played entry whenever the current track changes
   * (Issue #12/#13 — listening history). Runs once per genuine track
   * change: pausing/resuming the same track does not re-trigger this,
   * since currentTrack() is derived from queue/queueIndex, not isPlaying.
   *
   * Dedupe: replaying the same track id within RECENTLY_PLAYED_DEDUPE_WINDOW_MS
   * is skipped, to avoid spamming history on accidental double-plays or loops.
   *
   * Fire-and-forget by design: history logging must never block or break
   * playback, so failures are swallowed (dedupe state is reset on error so
   * a later replay attempt can retry).
   */
  private setupRecentlyPlayedRecording(): void {
    effect(() => {
      const trackId = this.playSessionKey();
      const track = this.currentTrack();
      if (!trackId || !track) return;

      const now = Date.now();
      const isDuplicate = trackId === this.lastLoggedTrackId && now - this.lastLoggedAt < RECENTLY_PLAYED_DEDUPE_WINDOW_MS;

      if (isDuplicate) return;

      this.lastLoggedTrackId = trackId;
      this.lastLoggedAt = now;

      // BaseTrack (the queue's static type) has no `source` field, but every
      // track that actually reaches the queue in practice came from either
      // EnrichedPlaylistTrack or EnrichedRecentlyPlayedTrack, both of which
      // do carry it at runtime. Defaulting to 'jamendo' is a defensive
      // fallback only — it should never actually be hit.
      const recordedTrackId = (track as { track_id?: string }).track_id ?? track.id;
      const recordedSource = (track as { source?: 'jamendo' | 'own' }).source ?? 'jamendo';

      this.libraryApi.addRecentlyPlayed({ source: recordedSource, trackId: recordedTrackId }).subscribe({
        error: (error: unknown) => {
          console.error('[PlayerStore] Failed to record recently-played track:', error);
          this.lastLoggedTrackId = null;
        },
      });
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
