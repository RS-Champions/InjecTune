import { BaseTrack } from './base-track';

export interface ArtistTrack extends BaseTrack {
  album_id: string;
  album_name: string;
  releasedate: string;
  album_image: string;
  image: string;
}
