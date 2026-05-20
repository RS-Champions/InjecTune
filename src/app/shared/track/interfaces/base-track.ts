export interface BaseTrack {
  id: string;
  name: string;
  duration: number;
  image: string;
  artist_name: string;
  stats: {
    listens_total: number;
  };
}
