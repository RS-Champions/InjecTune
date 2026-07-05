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
  description: string;
  meta: string;
}

export interface TrackPositionDto {
  id: string;
  position: number;
}

export interface ReorderTracksDto {
  tracks: TrackPositionDto[];
}
