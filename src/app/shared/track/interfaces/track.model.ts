export interface TrackModel {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  album_image: string;
  image: string;
  audio: string;
  releasedate: string;
  position: number;
  shareurl: string;
  stats?: {
    listens_total: number;
  };
  dateOfRecentTrackPlaying?: string;
  order?: number;
}
