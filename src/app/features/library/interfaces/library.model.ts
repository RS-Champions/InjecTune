export interface RecentTrack {
  id: string;
  cover: string;
  title: string;
  subtitle: string;
}

export interface PlaylistItem {
  id: string;
  cover: string | null;
  name: string;
  meta: string;
}
