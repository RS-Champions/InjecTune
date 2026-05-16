import { BaseArtist } from './base-artist';

export interface UserArtist extends BaseArtist {
  updatedate: string;
  relations: {
    fan: string;
  };
}
