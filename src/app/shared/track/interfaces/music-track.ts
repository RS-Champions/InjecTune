import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface MusicTrack extends BaseTrack {
  subtitle?: string;
  played_at?: string;
}
