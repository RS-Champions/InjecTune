import { SearchTrack } from '@shared/track/interfaces/search-track';

export interface PlaylistTrack {
  id: string;
  playlist_id: string;
  track_id: string;
  source: 'jamendo' | 'own';
  position: number;
}

/**
 * A playlist track row enriched with Jamendo metadata.
 * `PlaylistTrack` carries DB identity (id, position, source).
 * `SearchTrack` carries display metadata (name, image, artist, duration, album_id?, album_name?…).
 *
 * Jamendo does not always return album_id / album_name for every track,
 * so those fields are optional here.
 */
export interface EnrichedPlaylistTrack extends PlaylistTrack, SearchTrack {}

export interface RecentlyPlayedTrack {
  id: string;
  user_id: string;
  track_id: string;
  source: 'jamendo' | 'own';
  played_at: string;
}

/**
 * A recently-played row enriched with Jamendo metadata.
 * Mirrors EnrichedPlaylistTrack: DB identity fields (id, played_at, source)
 * take precedence over SearchTrack metadata on key collisions.
 */
export interface EnrichedRecentlyPlayedTrack extends RecentlyPlayedTrack, SearchTrack {}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  image?: string;
}

export interface PlaylistDetails extends Playlist {
  playlist_tracks: PlaylistTrack[];
}

export interface FavoriteItem {
  id: string;
  user_id: string;
  track_id: string;
  created_at: string;
}

// ── Request DTOs ───────────────────────────────────────────────────────────

export interface CreatePlaylistDto {
  name: string;
  description?: string;
}

export interface UpdatePlaylistDto {
  name?: string;
  description?: string;
}

export interface AddTrackDto {
  source: 'jamendo' | 'own';
  trackId: string;
  position: number;
}

export interface AddRecentlyPlayedDto {
  source: 'jamendo' | 'own';
  trackId: string;
}

export interface RecentlyPlayedFilterDto {
  from?: string;
  to?: string;
}

/**
 * Raw shape returned by GET/POST /tracks. Mirrors the `tracks` table plus
 * the signed playback URL the backend attaches on every response
 * (see TracksService.withSignedUrl). Not BaseTrack-shaped on its own —
 * see toBaseTrack() in own-track.mapper.ts for the adapter.
 */
export interface OwnTrack {
  id: string;
  user_id: string;
  title: string;
  artist: string | null;
  genre: string | null;
  file_path: string;
  duration: number;
  created_at: string;
  audioUrl: string;
}

export interface UploadTrackDto {
  title: string;
  artist?: string;
  genre?: string;
  /** Seconds, read client-side from the audio element before upload. */
  duration: number;
}
