import { Track } from '../models/track.model';

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    name: 'Midnight Drive',
    artist_name: 'Neon Atlas',
    album_image: 'https://picsum.photos/seed/track1/200',
    duration: 213,
    playcount: 1_234_567,
    audio: '',
  },
  {
    id: '2',
    name: 'Solar Winds',
    artist_name: 'Drift Collective',
    album_image: 'https://picsum.photos/seed/track2/200',
    duration: 187,
    playcount: 89_300,
    audio: '',
  },
  {
    id: '3',
    name: 'Empty Streets',
    artist_name: 'Lora Venn',
    album_image: 'https://picsum.photos/seed/track3/200',
    duration: 254,
    playcount: 4500,
    audio: '',
  },
];