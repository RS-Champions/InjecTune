import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiConfirmData, TuiToastService } from '@taiga-ui/kit';
import { LibraryApi } from '../services/library.api';

export interface HasPlaylistState {
  /** Returns the current playlist id, or null if not yet created */
  playlistId: () => string | null;
  /** Returns the number of tracks currently in the playlist */
  trackCount: () => number;
}

export const playlistEmptyGuard: CanDeactivateFn<HasPlaylistState> = (component) => {
  const id = component.playlistId();
  const count = component.trackCount();

  // Nothing to clean up — no playlist was created, or it has tracks
  if (!id || count > 0) return true;

  const dialogs = inject(TuiDialogService);
  const toasts = inject(TuiToastService);
  const libraryApi = inject(LibraryApi);

  const data: TuiConfirmData = {
    content: 'The playlist has no tracks and will not be saved. Leave anyway?',
    yes: 'Leave and discard',
    no: 'Stay',
  };

  return dialogs
    .open<boolean>(TUI_CONFIRM, {
      label: 'Empty playlist',
      size: 's',
      data,
    })
    .pipe(
      map((confirmed) => {
        if (!confirmed) return false;

        // Fire-and-forget: delete the empty playlist then allow navigation
        libraryApi.deletePlaylist(id).subscribe({
          next: () => {
            toasts.open('Empty playlist discarded.', { appearance: 'negative', autoClose: 3000 }).subscribe();
          },
        });
        return true;
      }),
    );
};
