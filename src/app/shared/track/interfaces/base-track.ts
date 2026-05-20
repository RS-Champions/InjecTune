export interface BaseTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  stats: {
    listens_total: number;
  };
  image?: string;
}
