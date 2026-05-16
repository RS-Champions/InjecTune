import { BaseTrack } from './base-track';

export interface UserTrack extends BaseTrack {
  releasedate: string;
  artist_id: string;
  artist_name: string;
  updatedate: string;
  album_image: string;
  image: string;
  relations: {
    review: string;
    favorite: string;
    like: string;
  };
}
