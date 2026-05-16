import { AlbumTrack } from '../interfaces/album-track';
import { TrackModel } from '../models/track.model';

export function mapAlbumTrackDtoToModel(dto: AlbumTrack): TrackModel {
  return {
    id: dto.id,
    title: dto.name,
    artistId: '',
    artistName: '',
    albumId: '',
    albumName: '',
    coverUrl: '',
    audioUrl: dto.audio,
    duration: Number(dto.duration),
    releaseDate: '',
    position: 0,
    shareUrl: '',
    playCount: Number(dto.count),
  };
}
