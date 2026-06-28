import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiConfirmData, TuiToastService } from '@taiga-ui/kit';
import { PlaylistDetailsPage } from '@features/library/pages/playlist-details-page/playlist-details-page';
import { LibraryApi } from '@features/library/services/library.api';

export const playlistEmptyGuard: CanDeactivateFn<PlaylistDetailsPage> = (component) => {
  const id = component.id();
  const count = component.tracks().length;

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

        libraryApi.deletePlaylist(id).subscribe({
          next: () => {
            toasts.open('Empty playlist discarded.', { appearance: 'negative', autoClose: 3000 }).subscribe();
          },
        });
        return true;
      }),
    );
};
