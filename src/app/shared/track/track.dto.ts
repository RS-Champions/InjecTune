export interface TrackDto {
  id: string;
  name: string;
  duration: string;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  album_image: string;
  image: string;
  releasedate: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
  shareurl: string;
  position: number;
}
