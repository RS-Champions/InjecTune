export interface BaseTrack {
  id: string;
  name: string;
  duration: number | string;
  artist_name: string;
  releasedate: string;
  audio: string;
  stats: {
    rate_listened_total: number;
  };
  musicinfo?: {
    tags?: {
      genres?: string[];
    };
  };
  image?: string;
}
