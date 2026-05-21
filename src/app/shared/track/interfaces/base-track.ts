export interface BaseTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  releasedate: string;
  audio: string;
  stats: {
    listens_total: number;
  };
  musicinfo?: {
    tags?: {
      genres?: string[];
    };
  };
  image?: string;
}
