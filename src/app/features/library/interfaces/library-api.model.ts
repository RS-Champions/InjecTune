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
