/**
 * Mirrors the backend's TRACK_UPLOAD_LIMITS (tracks.constants.ts) so the
 * upload dialog can reject an obviously-bad file before hitting the network.
 * Keep these two in sync if the backend limits ever change.
 */
export const TRACK_UPLOAD_LIMITS = {
  maxFileSizeBytes: 20 * 1024 * 1024,
  allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/webm'],
};
