export interface TrackModel {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumName: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  releaseDate: string;
  position: number;
  shareUrl: string;
  playCount?: number;
  dateOfRecentTrackPlaying?: string;
  order?: number;
}
