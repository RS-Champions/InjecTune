import { ArtistDto } from '../../shared/artist/interfaces/artist.dto';
import { UserArtist } from '../../shared/artist/interfaces/user-artist';

export const artists: ArtistDto[] = [
  {
    id: '376782',
    name: 'WE ARE FM',
    website: 'https://www.facebook.com/wearefm',
    joindate: '2011-12-29',
    image: 'https://usercontent.jamendo.com?type=artist&id=376782&width=300',
    shorturl: 'https://jamen.do/a/376782',
    shareurl: 'https://www.jamendo.com/artist/376782',
  },
];

export const userArtists: UserArtist[] = [
  {
    id: '104',
    name: 'Tryad',
    image: 'https://images.jamendo.com/artists/s0/104/covers/1.200.jpg?t=1470326207',
    joindate: '2005-04-13',
    updatedate: '2013-09-09 12:01:44',
    relations: {
      fan: '1',
    },
  },
  {
    id: '264',
    name: 'AS-POTIRONT!',
    image: 'https://images.jamendo.com/artists/a/as-potiront.jpg',
    joindate: '2005-07-04',
    updatedate: '2014-10-23 11:35:57',
    relations: {
      fan: '1',
    },
  },
  {
    id: '1030',
    name: 'Suerte',
    image: 'https://images.jamendo.com/artists/s/suerte.jpg',
    joindate: '2006-01-31',
    updatedate: '2013-09-30 09:10:55',
    relations: {
      fan: '1',
    },
  },
  {
    id: '3498',
    name: 'Nocreeps',
    image: 'https://images.jamendo.com/artists/n/nocreeps.jpg',
    joindate: '2006-11-01',
    updatedate: '2013-02-25 11:55:06',
    relations: {
      fan: '1',
    },
  },
];
