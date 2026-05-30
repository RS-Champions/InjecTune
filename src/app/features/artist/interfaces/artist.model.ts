export interface Album {
  id: string;
  name: string;
  releasedate: string;
  image: string;
}

export interface Artist {
  id: string;
  name: string;
  joindate: string;
  image: string;
  website: string;
  shareurl: string;
  albums?: Album[];
  tracks?: ArtistTrack[];
}
