import { BaseAlbum } from './base-album';

export interface AlbumDto extends BaseAlbum {
  artist_id: string;
  artist_name: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}
