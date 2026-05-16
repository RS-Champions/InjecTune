import { BaseArtist } from './base-artist';

export interface ArtistDto extends BaseArtist {
  website: string;
  shorturl: string;
  shareurl: string;
}
