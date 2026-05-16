import { TrackDto } from './track.dto';
import { TrackModel } from './track.model';

export function mapTrackDtoToModel(dto: TrackDto): TrackModel {
  return {
    id: dto.id,
    title: dto.name,
    artistId: dto.artist_id,
    artistName: dto.artist_name,
    albumId: dto.album_id,
    albumName: dto.album_name,
    coverUrl: dto.image,
    audioUrl: dto.audio,
    duration: Number(dto.duration),
    releaseDate: dto.releasedate,
    position: dto.position,
    shareUrl: dto.shareurl,
  };
}

export function mapTrackDtoArrayToModels(dtos: TrackDto[]): TrackModel[] {
  const models: TrackModel[] = [];
  for (const dto of dtos) {
    models.push(mapTrackDtoToModel(dto));
  }

  return models;
}
