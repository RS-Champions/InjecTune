import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface MusicTrack extends BaseTrack {
  played_at?: string;
}
