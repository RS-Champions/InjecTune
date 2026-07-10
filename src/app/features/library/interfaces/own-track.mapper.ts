import { SearchTrack } from '@shared/track/interfaces/search-track';
import { OwnTrack } from './library-api.model';

/**
 * Adapts a backend own-track row to SearchTrack — the shape both
 * AudioEngine (via its BaseTrack fields) and the playlist/recently-played
 * enrichment pipeline (EnrichedPlaylistTrack / EnrichedRecentlyPlayedTrack,
 * both `extends ... , SearchTrack`) actually need.
 *
 * SearchTrack = BaseTrack + artist_id (+ optional album_id/album_name).
 * Own tracks have no Jamendo artist, so artist_id is a synthetic
 * "own-{userId}" stand-in — unique per uploader, and obviously not a real
 * Jamendo id if it ever surfaces somewhere unexpected (e.g. an artist link).
 *
 * Field mapping notes:
 * - image: own uploads have no cover — empty string; MusicCard should
 *   fall back to placeholder artwork when image is falsy.
 * - stats.rate_listened_total: no listen-count concept for own tracks yet —
 *   defaults to 0 rather than being omitted, since BaseTrack.stats is required.
 * - musicinfo.tags.genres: only set when the track actually has a genre.
 */
export function toSearchTrack(track: OwnTrack): SearchTrack {
  return {
    id: track.id,
    name: track.title,
    duration: track.duration,
    image: '',
    artist_name: track.artist ?? 'Unknown artist',
    artist_id: `own-${track.user_id}`,
    releasedate: track.created_at,
    audio: track.audioUrl,
    stats: { rate_listened_total: 0 },
    musicinfo: track.genre ? { tags: { genres: [track.genre] } } : undefined,
  };
}

/** Convenience for mapping a whole list at once (e.g. tracksResource().value()). */
export function toSearchTracks(tracks: OwnTrack[]): SearchTrack[] {
  return tracks.map((track) => toSearchTrack(track));
}
