// Matches the Supabase schema and NestJS response shapes exactly.
export interface PlaylistTrack {
  id: string;
  playlist_id: string;
  track_id: string;
  source: 'jamendo' | 'own';
  position: number;
}

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
