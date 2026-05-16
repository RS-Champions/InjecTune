import { ArtistTrack } from '../interfaces/artist-track';
import { TrackModel } from '../models/track.model';

export function mapArtistTrackDtoToModel(dto: ArtistTrack): TrackModel {
  return {
    id: dto.id,
    title: dto.name,
    artistId: '',
    artistName: '',
    albumId: dto.album_id,
    albumName: dto.album_name,
    coverUrl: dto.image,
    audioUrl: dto.audio,
    duration: Number(dto.duration),
    releaseDate: dto.releasedate,
    position: 0,
    shareUrl: dto.license_ccurl,
  };
}
