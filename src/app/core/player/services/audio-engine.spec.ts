import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlayerStore } from '@core/player';
import { AudioEngine } from './audio-engine';
import type { RepeatMode } from '@core/player/interfaces/player-state';
import type { BaseTrack } from '@shared/track/interfaces/base-track';

// ── Mock HTMLAudioElement ─────────────────────────────────────────────────────

let mockAudioListeners: Partial<Record<string, EventListener>> = {};

let mockAudioInstance: MockAudio;

const addEventListenerMock = (event: string, listener: EventListener): void => {
  mockAudioListeners[event] = listener;
};

class MockAudio {
  crossOrigin: string | null = null;
  src = '';
  volume = 1;
  currentTime = 0;
  duration = 0;
  error = null;

  play = vi.fn().mockResolvedValue(undefined); // eslint-disable-line unicorn/no-useless-undefined
  pause = vi.fn();
  addEventListener = vi.fn(addEventListenerMock);

  constructor() {
    // capture reference for assertions
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    mockAudioInstance = this; // eslint-disable-line unicorn/no-this-assignment
  }
}

// module-level — runs before any test
vi.stubGlobal('Audio', MockAudio);

function fireAudioEvent(event: string): void {
  const listener = mockAudioListeners[event];

  if (listener) {
    listener(new Event(event));
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AudioEngine', () => {
  let engine: AudioEngine;
  let store: PlayerStore;

  beforeEach(() => {
    mockAudioListeners = {};
    localStorage.clear();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    engine = TestBed.inject(AudioEngine);
    store = TestBed.inject(PlayerStore);

    // mockAudioInstance is now set — reset its spies
    mockAudioInstance.play.mockClear();
    mockAudioInstance.pause.mockClear();
    mockAudioInstance.addEventListener.mockClear();

    // capture listeners registered during AudioEngine construction
    for (const [event, listener] of mockAudioInstance.addEventListener.mock.calls) {
      mockAudioListeners[event] = listener;
    }
  });

  // ── Creation ───────────────────────────────────────────────────────────────

  it('should be created', () => {
    expect(engine).toBeTruthy();
  });

  it('should initialize audio element volume from store', () => {
    expect(mockAudioInstance.volume).toBe(store.volume());
  });

  // ── playTrack ──────────────────────────────────────────────────────────────

  describe('playTrack', () => {
    it('should set queue with single track and play', () => {
      const track = makeTrack('1');
      engine.playTrack(track);

      expect(store.queue()).toEqual([track]);
      expect(store.queueIndex()).toBe(0);
      expect(mockAudioInstance.src).toBe(track.audio);
      expect(mockAudioInstance.play).toHaveBeenCalledOnce();
    });
  });

  // ── playQueue ──────────────────────────────────────────────────────────────

  describe('playQueue', () => {
    it('should set queue and start from given index', () => {
      const tracks = [makeTrack('1'), makeTrack('2'), makeTrack('3')];
      engine.playQueue(tracks, 1);

      expect(store.queue()).toEqual(tracks);
      expect(store.queueIndex()).toBe(1);
      expect(mockAudioInstance.src).toBe(tracks[1].audio);
    });

    it('should clamp startIndex to valid range', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks, 99);

      expect(store.queueIndex()).toBe(1); // clamped to last index
    });

    it('should warn and not play when queue is empty', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(vi.fn());
      engine.playQueue([]);

      expect(warn).toHaveBeenCalledWith('[AudioService] Attempt to play empty queue');
      expect(mockAudioInstance.play).not.toHaveBeenCalled();
    });

    it('should save originalQueue for shuffle restore', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks);

      expect(store.originalQueue()).toEqual(tracks);
    });
  });

  // ── next / previous ────────────────────────────────────────────────────────

  describe('next', () => {
    it('should advance to next track', () => {
      const tracks = [makeTrack('1'), makeTrack('2'), makeTrack('3')];
      engine.playQueue(tracks, 0);
      mockAudioInstance.play.mockClear();

      engine.next();

      expect(store.queueIndex()).toBe(1);
      expect(mockAudioInstance.src).toBe(tracks[1].audio);
      expect(mockAudioInstance.play).toHaveBeenCalledOnce();
    });

    it('should stop when at end of queue with repeat off', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks, 1);
      mockAudioInstance.play.mockClear();

      engine.next();

      expect(mockAudioInstance.pause).toHaveBeenCalled();
    });

    it('should loop to first track when repeat is all', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks, 1);
      store.repeat.set('all');
      mockAudioInstance.play.mockClear();

      engine.next();

      expect(store.queueIndex()).toBe(0);
      expect(mockAudioInstance.src).toBe(tracks[0].audio);
    });
  });

  describe('previous', () => {
    it('should go to previous track', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks, 1);
      mockAudioInstance.play.mockClear();

      engine.previous();

      expect(store.queueIndex()).toBe(0);
      expect(mockAudioInstance.src).toBe(tracks[0].audio);
    });

    it('should restart current track when at first track', () => {
      engine.playQueue([makeTrack('1')], 0);
      mockAudioInstance.currentTime = 30;

      engine.previous();

      expect(mockAudioInstance.currentTime).toBe(0);
    });
  });

  // ── pause / resume / stop ──────────────────────────────────────────────────

  describe('pause', () => {
    it('should pause audio element', () => {
      engine.pause();
      expect(mockAudioInstance.pause).toHaveBeenCalledOnce();
    });

    it('should save currentTime to localStorage', () => {
      mockAudioInstance.currentTime = 42;
      engine.pause();

      expect(localStorage.getItem('player:currentTime')).toBe('42');
    });
  });

  describe('resume', () => {
    it('should play when src is set', () => {
      mockAudioInstance.src = 'http://example.com/track.mp3';
      engine.resume();

      expect(mockAudioInstance.play).toHaveBeenCalledOnce();
    });

    it('should not play when src is empty', () => {
      mockAudioInstance.src = '';
      engine.resume();

      expect(mockAudioInstance.play).not.toHaveBeenCalled();
    });
  });

  describe('stop', () => {
    it('should pause and reset currentTime to 0', () => {
      mockAudioInstance.currentTime = 60;
      engine.stop();

      expect(mockAudioInstance.pause).toHaveBeenCalled();
      expect(mockAudioInstance.currentTime).toBe(0);
    });
  });

  // ── seek ───────────────────────────────────────────────────────────────────

  describe('seek', () => {
    it('should set audio currentTime and update store', () => {
      store.duration.set(300);
      engine.seek(120);

      expect(mockAudioInstance.currentTime).toBe(120);
      expect(store.currentTime()).toBe(120);
    });

    it('should clamp to 0 minimum', () => {
      store.duration.set(300);
      engine.seek(-10);

      expect(mockAudioInstance.currentTime).toBe(0);
    });

    it('should clamp to duration maximum', () => {
      store.duration.set(300);
      engine.seek(999);

      expect(mockAudioInstance.currentTime).toBe(300);
    });
  });

  // ── setVolume ──────────────────────────────────────────────────────────────

  describe('setVolume', () => {
    it('should set audio volume and update store', () => {
      engine.setVolume(0.7);

      expect(mockAudioInstance.volume).toBe(0.7);
      expect(store.volume()).toBe(0.7);
    });

    it('should clamp to 0 minimum', () => {
      engine.setVolume(-1);
      expect(mockAudioInstance.volume).toBe(0);
    });

    it('should clamp to 1 maximum', () => {
      engine.setVolume(2);
      expect(mockAudioInstance.volume).toBe(1);
    });
  });

  // ── setShuffle ─────────────────────────────────────────────────────────────

  describe('setShuffle', () => {
    it('should shuffle queue keeping current track at front', () => {
      const tracks = [makeTrack('1'), makeTrack('2'), makeTrack('3'), makeTrack('4')];
      engine.playQueue(tracks, 0);

      engine.setShuffle(true);

      expect(store.shuffle()).toBe(true);
      expect(store.queue()[0].id).toBe('1'); // current track stays first
      expect(store.queue().length).toBe(4);
      expect(store.queueIndex()).toBe(0);
    });

    it('should restore original order when disabling shuffle', () => {
      const tracks = [makeTrack('1'), makeTrack('2'), makeTrack('3')];
      engine.playQueue(tracks, 0);
      engine.setShuffle(true);

      engine.setShuffle(false);

      expect(store.shuffle()).toBe(false);
      expect(store.queue()).toEqual(tracks);
    });

    it('should do nothing when queue is empty', () => {
      expect(() => {
        engine.setShuffle(true);
      }).not.toThrow();
    });
  });

  // ── setRepeatMode ──────────────────────────────────────────────────────────

  describe('setRepeatMode', () => {
    it('should set repeat mode to all', () => {
      engine.setRepeatMode('all');
      expect(store.repeat()).toBe('all');
    });

    it('should set repeat mode to one', () => {
      engine.setRepeatMode('one');
      expect(store.repeat()).toBe('one');
    });

    it('should set repeat mode to off', () => {
      store.repeat.set('all');
      engine.setRepeatMode('off');
      expect(store.repeat()).toBe('off');
    });

    it('should warn on invalid mode', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(vi.fn());
      engine.setRepeatMode('invalid' as RepeatMode);

      expect(warn).toHaveBeenCalled();
      expect(store.repeat()).toBe('off'); // unchanged
    });
  });

  // ── Audio event listeners ─────────────────────────────────────────────────

  describe('audio event listeners', () => {
    it('should update store.isPlaying on playing event', () => {
      fireAudioEvent('playing');
      expect(store.isPlaying()).toBe(true);
    });

    it('should update store.isPlaying on pause event', () => {
      store.isPlaying.set(true);
      fireAudioEvent('pause');
      expect(store.isPlaying()).toBe(false);
    });

    it('should update store.isLoading on loadstart', () => {
      fireAudioEvent('loadstart');
      expect(store.isLoading()).toBe(true);
    });

    it('should update store.isLoading on canplay', () => {
      store.isLoading.set(true);
      fireAudioEvent('canplay');
      expect(store.isLoading()).toBe(false);
    });

    it('should advance to next track when ended and hasNext', () => {
      const tracks = [makeTrack('1'), makeTrack('2')];
      engine.playQueue(tracks, 0);
      mockAudioInstance.play.mockClear();

      fireAudioEvent('ended');

      expect(store.queueIndex()).toBe(1);
    });

    it('should replay track when ended and repeat is one', () => {
      engine.playQueue([makeTrack('1')], 0);
      store.repeat.set('one');
      mockAudioInstance.currentTime = 60;
      mockAudioInstance.play.mockClear();

      fireAudioEvent('ended');

      expect(mockAudioInstance.currentTime).toBe(0);
      expect(mockAudioInstance.play).toHaveBeenCalled();
    });
  });
});

// ── Test helpers ──────────────────────────────────────────────────────────────

// import type { RepeatMode } from '@core/player/interfaces/player-state';
// import type { BaseTrack } from '@shared/track/interfaces/base-track';

function makeTrack(id: string): BaseTrack {
  return {
    id,
    name: `Track ${id}`,
    duration: 180,
    artist_name: 'Test Artist',
    releasedate: '2024-01-01',
    audio: `https://example.com/track-${id}.mp3`,
    image: `https://example.com/cover-${id}.jpg`,
    stats: {
      rate_listened_total: 1000,
    },
  };
}
