import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface SearchTrack extends BaseTrack {
  artist_id: string;
  album_id?: string;
  album_name?: string;
}
