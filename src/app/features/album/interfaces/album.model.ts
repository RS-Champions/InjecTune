import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface Album {
  id: string;
  name: string;
  image: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  duration?: number;
  tracks?: AlbumTrack[];
}

export interface AlbumTrack extends BaseTrack {
  position: number;
}
