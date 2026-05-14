export interface Album {
  id: string;
  name: string;
  releasedate: string;
  image: string;
}

export interface ReviewAlbum {
  id: string;
  title: string;
  text: string;
  dateadded: string;
  agreecnt: string;
  lang: string;
  user_id: string;
  user_name: string;
  user_dispname: string;
  score: string;
  album_id: string;
  album_name: string;
  artist_id: string;
}

export interface UserAlbum extends Album {
  artist_id: string;
  artist_name: string;
  updatedate: string;
  relations: {
    myalbums: string;
  };
}

export const albums: Album[] = [
  {
    id: '104336',
    name: 'Season One',
    releasedate: '2011-12-29',
    image: 'https://images.jamendo.com/albums/s104/104336/covers/1.200.jpg',
  },
];

export const reviewAlbums: ReviewAlbum[] = [
  {
    id: '387930',
    title: 'Good album',
    text: "Hi guys!\r\nCongratulations for \"My world\". I discovered this track on the Jamendo facebook page and it's just awesome. I haven't listened to the whole album yet but I'll do it straight away! Thanks for sharing!",
    dateadded: '2012-02-03',
    agreecnt: '0',
    lang: 'en',
    user_id: '592597',
    user_name: 'morganejamendo',
    user_dispname: 'morganejamendo',
    score: '8',
    album_id: '104336',
    album_name: 'Season One',
    artist_id: '376782',
  },
  {
    id: '388939',
    title: 'Awesome!!!!!!',
    text: 'I absolutely love the whole album!!! You guys have a great sound faving you right away!! people must hear you!!!\r\n\r\nWell done! you have a fan',
    dateadded: '2012-02-11',
    agreecnt: '4',
    lang: 'en',
    user_id: '485198',
    user_name: 'jem9',
    user_dispname: 'jem9',
    score: '10',
    album_id: '104336',
    album_name: 'Season One',
    artist_id: '376782',
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
