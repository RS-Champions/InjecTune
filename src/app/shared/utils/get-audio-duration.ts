/**
 * Reads the duration (in whole seconds) of an audio File without uploading
 * it anywhere — used to fill UploadTrackDto.duration automatically instead
 * of asking the person to type it in.
 *
 * Works by loading the file into a throwaway <audio> element via an object
 * URL; 'loadedmetadata' is the first point at which .duration is populated
 * for most browsers/codecs. The object URL is always revoked, even on error,
 * so this doesn't leak memory if the file is corrupt or unsupported.
 */
export function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio();

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('error', onError);
    };

    const onLoaded = () => {
      const duration = Math.round(audio.duration);
      cleanup();
      resolve(duration);
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Could not read duration for "${file.name}" — file may be corrupt or an unsupported format.`));
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('error', onError);
    audio.src = objectUrl;
  });
}
