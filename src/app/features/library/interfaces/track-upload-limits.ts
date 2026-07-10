/**
 * Mirrors the backend's TRACK_UPLOAD_LIMITS (tracks.constants.ts) so the
 * upload dialog can reject an obviously-bad file before hitting the network.
 * Keep these two in sync if the backend limits ever change.
 */
export const MAX_FILE_SIZE_MB = 20;

export const TRACK_UPLOAD_LIMITS = {
  maxFileSizeBytes: MAX_FILE_SIZE_MB * 1024 * 1024,
  allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/webm'],
};
