export interface BaseTrack {
  id: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}

export interface AlbumTrack extends BaseTrack {
  count: string;
  position: string;
}

export interface ArtistTrack extends BaseTrack {
  album_id: string;
  album_name: string;
  releasedate: string;
  album_image: string;
  image: string;
}

export interface ReviewTrack {
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
  track_id: string;
  track_name: string;
  album_id: string;
  artist_id: string;
  track_audiodownload_allowed: boolean;
  track_license_ccurl: string;
  track_audio: string;
  track_audiodownload: string;
}

export interface UserTrack extends BaseTrack {
  releasedate: string;
  artist_id: string;
  artist_name: string;
  updatedate: string;
  album_image: string;
  image: string;
  relations: {
    review: string;
    favorite: string;
    like: string;
  };
}

export const albumTracks: AlbumTrack[] = [
  {
    count: '1',
    id: '887202',
    position: '10',
    name: 'Press Record',
    duration: '192',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887202&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887202/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887203',
    position: '3',
    name: "No Words (Director's Cut)",
    duration: '338',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887203&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887203/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887204',
    position: '2',
    name: 'Dance',
    duration: '211',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887204&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887204/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887205',
    position: '6',
    name: 'Episode 4 Pt. 3',
    duration: '99',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887205&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887205/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887206',
    position: '4',
    name: 'Episode 4 Pt. 1',
    duration: '198',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887206&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887206/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887207',
    position: '5',
    name: 'Episode 4 Pt. 2',
    duration: '198',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887207&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887207/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887208',
    position: '1',
    name: 'My World',
    duration: '202',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887208&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887208/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887209',
    position: '9',
    name: 'Scene 5',
    duration: '325',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887209&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887209/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887210',
    position: '7',
    name: 'God Save The DJ',
    duration: '240',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887210&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887210/mp32/',
    audiodownload_allowed: true,
  },
  {
    count: '1',
    id: '887211',
    position: '8',
    name: 'City',
    duration: '197',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887211&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887211/mp32/',
    audiodownload_allowed: true,
  },
];

export const artistTracks: ArtistTrack[] = [
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887209',
    name: 'Scene 5',
    duration: '325',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887209&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887209/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887202',
    name: 'Press Record',
    duration: '192',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887202',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887202',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887202&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887202/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887203',
    name: "No Words (Director's Cut)",
    duration: '338',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887203',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887203',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887203&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887203/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887208',
    name: 'My World',
    duration: '202',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887208',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887208',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887208&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887208/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887210',
    name: 'God Save The DJ',
    duration: '240',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887210',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887210',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887210&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887210/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887205',
    name: 'Episode 4 Pt. 3',
    duration: '99',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887205',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887205',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887205&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887205/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887207',
    name: 'Episode 4 Pt. 2',
    duration: '198',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887207',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887207',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887207&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887207/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887206',
    name: 'Episode 4 Pt. 1',
    duration: '198',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887206',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887206',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887206&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887206/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887204',
    name: 'Dance',
    duration: '211',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887204',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887204',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887204&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887204/mp31/',
    audiodownload_allowed: true,
  },
  {
    album_id: '104336',
    album_name: 'Season One',
    id: '887211',
    name: 'City',
    duration: '197',
    releasedate: '2011-12-29',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
    image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=887211&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887211/mp31/',
    audiodownload_allowed: true,
  },
];

export const reviewTracks: ReviewTrack[] = [
  {
    id: '533416',
    title: '',
    text: 'Hi',
    dateadded: '2023-12-09',
    agreecnt: '5',
    lang: 'en',
    user_id: '8849127',
    user_name: 's12384657@students.duvalschools.org',
    user_dispname: 'Elektra_L',
    score: '10',
    track_id: '2133898',
    track_name: 'One Gift Shawty (For Christmas)',
    album_id: '549522',
    artist_id: '484695',
    track_audiodownload_allowed: true,
    track_license_ccurl: 'http://creativecommons.org/licenses/by-nc-nd/3.0/',
    track_audio: 'https://prod-1.storage.jamendo.com/?trackid=2133898&format=mp31&from=app-devsite',
    track_audiodownload: 'https://prod-1.storage.jamendo.com/download/track/2133898/mp32/',
  },
  {
    id: '532432',
    title: '',
    text: 'Love it',
    dateadded: '2023-07-15',
    agreecnt: '0',
    lang: 'en',
    user_id: '8678316',
    user_name: 'jonze785@gmail.com',
    user_dispname: 'jonze785',
    score: '10',
    track_id: '2026253',
    track_name: 'Moon Reflections',
    album_id: '519570',
    artist_id: '485950',
    track_audiodownload_allowed: false,
    track_license_ccurl: 'http://creativecommons.org/licenses/by-nc-nd/3.0/',
    track_audio: '',
    track_audiodownload: '',
  },
];

export const userTracks: UserTrack[] = [
  {
    id: '391002',
    name: 'Balrog Boogie',
    releasedate: '2009-07-23',
    artist_id: '351716',
    duration: '233',
    artist_name: 'Diablo Swing Orchestra',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-nd/3.0/',
    updatedate: '2014-02-18 15:39:55',
    album_image: 'https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002',
    image: 'https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=391002&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/391002/mp32/',
    relations: {
      review: '10',
      favorite: '0',
      like: '1',
    },
    audiodownload_allowed: true,
  },
  {
    id: '238862',
    name: 'Only God Knows Why',
    releasedate: '2008-11-14',
    artist_id: '3498',
    duration: '338',
    artist_name: 'Nocreeps',
    license_ccurl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    updatedate: '2013-02-25 12:31:57',
    album_image: 'https://usercontent.jamendo.com?type=album&id=34802&width=300&trackid=238862',
    image: 'https://usercontent.jamendo.com?type=album&id=34802&width=300&trackid=238862',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=238862&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/238862/mp32/',
    relations: {
      review: '10',
      favorite: '0',
      like: '1',
    },
    audiodownload_allowed: true,
  },
  {
    id: '353341',
    name: 'Yellow Gold',
    releasedate: '2009-06-06',
    artist_id: '343767',
    duration: '289',
    artist_name: 'John Dada &amp; the Weathermen',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-nd/3.0/',
    updatedate: '2013-01-17 17:57:48',
    album_image: 'https://usercontent.jamendo.com?type=album&id=46816&width=300&trackid=353341',
    image: 'https://usercontent.jamendo.com?type=album&id=46816&width=300&trackid=353341',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=353341&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/353341/mp32/',
    relations: {
      review: '10',
      favorite: '0',
      like: '1',
    },
    audiodownload_allowed: true,
  },
  {
    id: '628410',
    name: 'Mi ammazzo di caffè',
    releasedate: '2010-08-08',
    artist_id: '362118',
    duration: '274',
    artist_name: 'Falsorigo',
    license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
    updatedate: '2014-01-20 12:02:52',
    album_image: 'https://usercontent.jamendo.com?type=album&id=72779&width=300&trackid=628410',
    image: 'https://usercontent.jamendo.com?type=album&id=72779&width=300&trackid=628410',
    audio: 'https://prod-1.storage.jamendo.com/?trackid=628410&format=mp31&from=app-devsite',
    audiodownload: 'https://prod-1.storage.jamendo.com/download/track/628410/mp32/',
    relations: {
      review: '9',
      favorite: '0',
      like: '1',
    },
    audiodownload_allowed: true,
  },
];
