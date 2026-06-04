import type { BaseTrack } from '@shared/track/interfaces/base-track';

/**
 * Repeat mode for playback
 * - 'off': Stop at end of queue
 * - 'all': Loop the entire queue
 * - 'one': Replay current track
 */
export type RepeatMode = 'off' | 'all' | 'one';

/**
 * Playback state
 */
export type PlaybackState = 'playing' | 'paused' | 'stopped';

/**
 * Extended track type for the player
 * Uses BaseTrack as the foundation for all player tracks
 */

/**
 * Player configuration and state snapshot
 */
export interface PlayerStateSnapshot {
  currentTrack: BaseTrack | null;
  queue: BaseTrack[];
  queueIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  isLoading: boolean;
}

/**
 * localStorage keys for player state persistence
 */
export const PLAYER_STORAGE_KEYS = {
  QUEUE: 'player:queue',
  CURRENT_TIME: 'player:currentTime',
  QUEUE_INDEX: 'player:queueIndex',
  VOLUME: 'player:volume',
  SHUFFLE: 'player:shuffle',
  REPEAT: 'player:repeat',
} as const;
