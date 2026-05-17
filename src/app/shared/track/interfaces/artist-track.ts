export interface ArtistTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_image: string;
  stats: {
    listens_total: number;
  };
}
