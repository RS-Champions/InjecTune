import { BaseTrack } from '@shared/track/interfaces/base-track';

export interface ArtistAlbum {
  id: string;
  name: string;
  releasedate: string;
  image: string;
  tracks?: ArtistAlbumTrack[];
  tracksCount?: number;
}

export interface ArtistAlbumTrack {
  id: string;
  name: string;
  position: string;
}

export interface ArtistTrack extends BaseTrack {
  album_id?: string;
  album_name?: string;
  album_image?: string;
}

export interface Artist {
  id: string;
  name: string;
  joindate: string;
  image: string;
  website: string;
  shareurl: string;
  albums?: ArtistAlbum[];
  tracks?: ArtistTrack[];
}
