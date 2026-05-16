import { AlbumDto } from '../../shared/album/interfaces/album.dto';
import { BaseAlbum } from '../../shared/album/interfaces/base-album';
import { UserAlbum } from '../../shared/album/interfaces/user-album';

export const albums: AlbumDto[] = [
  {
    id: '104336',
    name: 'Season One',
    releasedate: '2011-12-29',
    artist_id: '376782',
    artist_name: 'WE ARE FM',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300',
    zip: 'https://storage.jamendo.com/download/a104336/mp32/',
    shorturl: 'https://jamen.do/l/a104336',
    shareurl: 'https://www.jamendo.com/list/a104336',
    zip_allowed: true,
  },
  {
    id: '124067',
    name: 'Season One: Instrumental',
    releasedate: '2013-08-01',
    artist_id: '376782',
    artist_name: 'WE ARE FM',
    image: 'https://usercontent.jamendo.com?type=album&id=124067&width=300',
    zip: 'https://storage.jamendo.com/download/a124067/mp32/',
    shorturl: 'https://jamen.do/l/a124067',
    shareurl: 'https://www.jamendo.com/list/a124067',
    zip_allowed: true,
  },
];

export const artistAlbums: BaseAlbum[] = [
  {
    id: '104336',
    name: 'Season One',
    releasedate: '2011-12-29',
    image: 'https://images.jamendo.com/albums/s104/104336/covers/1.200.jpg',
  },
];

export const userAlbums: UserAlbum[] = [
  {
    id: '2225',
    name: 'Increase the Dosage',
    releasedate: '2006-06-20',
    artist_id: '2278',
    artist_name: 'revolutionvoid',
    updatedate: '2010-12-19 16:25:12',
    image: 'https://images.jamendo.com/albums/s2/2225/covers/1.200.jpg',
    relations: {
      myalbums: '1',
    },
  },
  {
    id: '23777',
    name: "Beginner's Luck",
    releasedate: '2008-04-23',
    artist_id: '339253',
    artist_name: 'Lindalou_and_Michael_Ryge',
    updatedate: '2011-07-05 09:53:04',
    image: 'https://images.jamendo.com/albums/s23/23777/covers/1.200.jpg',
    relations: {
      myalbums: '1',
    },
  },
  {
    id: '28245',
    name: 'Dinner for One',
    releasedate: '2008-07-07',
    artist_id: '340555',
    artist_name: 'Amity_in_Fame',
    updatedate: '2014-02-04 11:21:42',
    image: 'https://images.jamendo.com/albums/s28/28245/covers/1.200.jpg',
    relations: {
      myalbums: '1',
    },
  },
  {
    id: '37195',
    name: 'Classical Music - Bach: Partitas for piano (BWV 826, 827, 828)',
    releasedate: '2008-12-24',
    artist_id: '346808',
    artist_name: 'Gianluca_Luisi',
    updatedate: '2011-11-24 12:07:48',
    image: 'https://images.jamendo.com/albums/s37/37195/covers/1.200.jpg',
    relations: {
      myalbums: '1',
    },
  },
];
