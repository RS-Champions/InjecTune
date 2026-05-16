import { BaseAlbum } from './base-album';

export interface UserAlbum extends BaseAlbum {
  artist_id: string;
  artist_name: string;
  updatedate: string;
  relations: {
    myalbums: string;
  };
}
