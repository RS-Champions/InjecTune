export interface BaseTrack {
  id: string;
  name: string;
  duration: number | string;
  image: string;
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
  position?: number;
}
