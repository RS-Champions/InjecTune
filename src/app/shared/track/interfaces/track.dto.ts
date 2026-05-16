import { BaseTrack } from './base-track';

export interface TrackDto extends BaseTrack {
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  album_image: string;
  image: string;
  releasedate: string;
  shareurl: string;
  position: number;
}
