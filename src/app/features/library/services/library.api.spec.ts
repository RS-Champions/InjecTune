import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import {
  AddRecentlyPlayedDto,
  AddTrackDto,
  CreatePlaylistDto,
  FavoriteItem,
  Playlist,
  PlaylistDetails,
  PlaylistTrack,
  RecentlyPlayedFilterDto,
  RecentlyPlayedTrack,
  UpdatePlaylistDto,
} from '../interfaces/library-api.model';
import { ReorderTracksDto } from '../interfaces/library.model';
import { LibraryApi } from './library.api';

const BASE_URL = 'http://localhost:3000';

const testPlaylist: Playlist = {
  id: 'playlist-1',
  name: 'Road Trip',
  description: 'Songs for the road',
  image: '',
  user_id: '00000000-0000-0000-0000-000000000001',
  created_at: '2026-07-05',
  updated_at: '2026-07-07',
};

const testPlaylistDetails: PlaylistDetails = {
  ...testPlaylist,
  playlist_tracks: [],
} as PlaylistDetails;

const testRecentlyPlayedTrack: RecentlyPlayedTrack = {
  id: 'rp-1',
  track_id: '1721311',
  source: 'jamendo',
  played_at: '2026-07-04T19:53:49.465675+00:00',
} as RecentlyPlayedTrack;

const testFavoriteItem: FavoriteItem = {
  id: 'fav-1',
  track_id: '1721311',
} as FavoriteItem;

const testPlaylistTrack: PlaylistTrack = {
  id: 'pt-1',
  track_id: '1721311',
  source: 'jamendo',
  position: 0,
} as PlaylistTrack;

/** Polls until pending resource state (request effect + response microtask) settles. */
async function waitForResource<T>(getValue: () => T, expected: T): Promise<void> {
  await vi.waitFor(() => {
    TestBed.tick();
    expect(getValue()).toEqual(expected);
  });
}

describe('LibraryApi', () => {
  let service: LibraryApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: LIBRARY_API_URL, useValue: BASE_URL }],
    });

    service = TestBed.inject(LibraryApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('playlistsResource', () => {
    it('requests GET /playlists', async () => {
      const resource = TestBed.runInInjectionContext(() => service.playlistsResource());
      TestBed.tick();

      const request = httpMock.expectOne(`${BASE_URL}/playlists`);
      expect(request.request.method).toBe('GET');
      request.flush([testPlaylist]);

      await waitForResource(() => resource.value(), [testPlaylist]);
    });

    it('defaults to an empty array while loading', () => {
      const resource = TestBed.runInInjectionContext(() => service.playlistsResource());
      TestBed.tick();

      expect(resource.value()).toEqual([]);

      httpMock.expectOne(`${BASE_URL}/playlists`).flush([testPlaylist]);
      TestBed.tick();
    });
  });

  describe('playlistDetailsResource', () => {
    it('requests GET /playlists/:id when an id is provided', async () => {
      const id = signal<string | null>('playlist-1');
      const resource = TestBed.runInInjectionContext(() => service.playlistDetailsResource(id));
      TestBed.tick();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-1`);
      expect(request.request.method).toBe('GET');
      request.flush(testPlaylistDetails);

      await waitForResource(() => resource.value(), testPlaylistDetails);
    });

    it('makes no request when id is null', () => {
      const id = signal<string | null>(null);
      TestBed.runInInjectionContext(() => service.playlistDetailsResource(id));
      TestBed.tick();

      httpMock.expectNone(() => true);
    });

    it('re-requests when the id signal changes', () => {
      const id = signal<string | null>('playlist-1');
      TestBed.runInInjectionContext(() => service.playlistDetailsResource(id));
      TestBed.tick();

      httpMock.expectOne(`${BASE_URL}/playlists/playlist-1`).flush(testPlaylistDetails);
      TestBed.tick();

      id.set('playlist-2');
      TestBed.tick();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-2`);
      expect(request.request.method).toBe('GET');
      request.flush({ ...testPlaylistDetails, id: 'playlist-2' });
      TestBed.tick();
    });
  });

  describe('recentlyPlayedResource', () => {
    it('requests GET /recently-played with no params when filter is empty', async () => {
      const filter = signal<RecentlyPlayedFilterDto>({});
      const resource = TestBed.runInInjectionContext(() => service.recentlyPlayedResource(filter));
      TestBed.tick();

      const request = httpMock.expectOne(`${BASE_URL}/recently-played`);
      expect(request.request.method).toBe('GET');
      request.flush([testRecentlyPlayedTrack]);

      await waitForResource(() => resource.value(), [testRecentlyPlayedTrack]);
    });

    it('forwards from/to as query params when filter is set', () => {
      const filter = signal<RecentlyPlayedFilterDto>({ from: '2026-06-01', to: '2026-06-28' });
      TestBed.runInInjectionContext(() => service.recentlyPlayedResource(filter));
      TestBed.tick();

      const request = httpMock.expectOne(
        (r) =>
          r.url === `${BASE_URL}/recently-played` &&
          r.params.get('from') === '2026-06-01' &&
          r.params.get('to') === '2026-06-28',
      );
      request.flush([testRecentlyPlayedTrack]);
      TestBed.tick();
    });

    it('defaults to an empty array while loading', () => {
      const filter = signal<RecentlyPlayedFilterDto>({});
      const resource = TestBed.runInInjectionContext(() => service.recentlyPlayedResource(filter));
      TestBed.tick();

      expect(resource.value()).toEqual([]);

      httpMock.expectOne(`${BASE_URL}/recently-played`).flush([testRecentlyPlayedTrack]);
      TestBed.tick();
    });

    it('re-requests when the filter signal changes', () => {
      const filter = signal<RecentlyPlayedFilterDto>({});
      TestBed.runInInjectionContext(() => service.recentlyPlayedResource(filter));
      TestBed.tick();

      httpMock.expectOne(`${BASE_URL}/recently-played`).flush([testRecentlyPlayedTrack]);
      TestBed.tick();

      filter.set({ from: '2026-01-01' });
      TestBed.tick();

      const request = httpMock.expectOne(
        (r) => r.url === `${BASE_URL}/recently-played` && r.params.get('from') === '2026-01-01',
      );
      request.flush([]);
      TestBed.tick();
    });
  });

  describe('createPlaylist', () => {
    it('POSTs to /playlists with the dto', () => {
      const dto: CreatePlaylistDto = { name: 'New Playlist', description: '' };

      service.createPlaylist(dto).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/playlists`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(dto);

      request.flush(testPlaylist);
    });
  });

  describe('updatePlaylist', () => {
    it('PATCHes /playlists/:id with the dto', () => {
      const dto: UpdatePlaylistDto = { name: 'Renamed' };

      service.updatePlaylist('playlist-1', dto).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-1`);
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(dto);

      request.flush({ ...testPlaylist, ...dto });
    });
  });

  describe('deletePlaylist', () => {
    it('DELETEs /playlists/:id', () => {
      service.deletePlaylist('playlist-1').subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-1`);
      expect(request.request.method).toBe('DELETE');

      request.flush(null);
    });
  });

  describe('addTrackToPlaylist', () => {
    it('POSTs to /playlists/:id/tracks with the dto', () => {
      const dto: AddTrackDto = { source: 'jamendo', trackId: '1721311', position: 0 };

      service.addTrackToPlaylist('playlist-1', dto).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-1/tracks`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(dto);

      request.flush(testPlaylistTrack);
    });
  });

  describe('removeTrackFromPlaylist', () => {
    it('DELETEs /playlists/:id/tracks/:trackId with default source=jamendo', () => {
      service.removeTrackFromPlaylist('playlist-1', '1721311').subscribe();

      const request = httpMock.expectOne(
        (r) => r.url === `${BASE_URL}/playlists/playlist-1/tracks/1721311` && r.params.get('source') === 'jamendo',
      );
      expect(request.request.method).toBe('DELETE');

      request.flush(null);
    });

    it('forwards an explicit source when provided', () => {
      service.removeTrackFromPlaylist('playlist-1', 'own-track-1', 'own').subscribe();

      const request = httpMock.expectOne(
        (r) => r.url === `${BASE_URL}/playlists/playlist-1/tracks/own-track-1` && r.params.get('source') === 'own',
      );

      request.flush(null);
    });
  });

  describe('reorderTracks', () => {
    it('PATCHes /playlists/:id/reorder with the dto', () => {
      const dto: ReorderTracksDto = { tracks: [{ id: 'pt-1', position: 1 }] };

      service.reorderTracks('playlist-1', dto).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/playlists/playlist-1/reorder`);
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(dto);

      request.flush(testPlaylistDetails);
    });
  });

  describe('addFavorite', () => {
    it('POSTs to /favorites/:trackId with an empty body', () => {
      service.addFavorite('1721311').subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/favorites/1721311`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({});

      request.flush(testFavoriteItem);
    });
  });

  describe('removeFavorite', () => {
    it('DELETEs /favorites/:trackId', () => {
      service.removeFavorite('1721311').subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/favorites/1721311`);
      expect(request.request.method).toBe('DELETE');

      request.flush(null);
    });
  });

  describe('addRecentlyPlayed', () => {
    it('POSTs to /recently-played with the dto', () => {
      const dto: AddRecentlyPlayedDto = { source: 'jamendo', trackId: '1721311' };

      service.addRecentlyPlayed(dto).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/recently-played`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(dto);

      request.flush(testRecentlyPlayedTrack);
    });
  });
});
