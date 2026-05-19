import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface SearchTrack extends BaseTrack {
  album_id: string;
  album_image: string;
  artist_id: string;
}
