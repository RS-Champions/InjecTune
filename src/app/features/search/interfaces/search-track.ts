import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface SearchTrack extends BaseTrack {
  album_id: string;
  image: string;
  artist_id: string;
}
