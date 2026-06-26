import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiConfirmData, TuiToastService } from '@taiga-ui/kit';
import { PlaylistDetailsPage } from '@features/library/pages/playlist-details-page/playlist-details-page';
import { LibraryApi } from '@features/library/services/library.api';

export const playlistEmptyGuard: CanDeactivateFn<PlaylistDetailsPage> = (component) => {
  const id = component.id();
  const count = component.tracks().length;
  const hasError = component.hasResourceError();

  if (!id || count > 0 || hasError) return true;

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
      switchMap((confirmed) => {
        if (!confirmed) return of(false);

        return libraryApi.deletePlaylist(id).pipe(
          map(() => {
            toasts.open('Empty playlist discarded.', { appearance: 'negative', autoClose: 3000 }).subscribe();
            return true;
          }),
          catchError(() => of(true)), // navigate anyway if delete fails
        );
      }),
    );
};
