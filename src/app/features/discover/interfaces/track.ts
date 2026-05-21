interface Track {
  image: string;
  name: string;
  artist_name: string;
  duration: number;
  id: string;
}

export interface TrackResponse {
  results: Track[];
}
