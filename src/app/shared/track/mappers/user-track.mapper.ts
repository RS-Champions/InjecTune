import { UserTrack } from '../interfaces/user-track';
import { TrackModel } from '../models/track.model';

export function mapUserTrackDtoToModel(dto: UserTrack): TrackModel {
  return {
    id: dto.id,
    title: dto.name,
    artistId: dto.artist_id,
    artistName: dto.artist_name,
    albumId: '',
    albumName: '',
    coverUrl: dto.image,
    audioUrl: dto.audio,
    duration: Number(dto.duration),
    releaseDate: '',
    position: 0,
    shareUrl: '',
  };
}
