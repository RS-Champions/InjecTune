import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError, of, filter, tap } from 'rxjs';

import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { SearchTrack } from '@shared/track/interfaces/search-track';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';

import { TuiButton, TuiInput, TuiLoader, TuiTextfield } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-track-search',
  imports: [FormsModule, FormatDurationPipe, TuiButton, TuiInput, TuiLoader, TuiTextfield],
  templateUrl: './playlist-track-search.html',
  styleUrl: './playlist-track-search.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistTrackSearch {
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);

  readonly trackSelected = output<SearchTrack>();

  protected readonly query = signal('');
  protected readonly isLoading = signal(false);

  protected readonly results = toSignal(
    toObservable(this.query).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((q) => q.trim()),
      filter((q) => q.length > 1),
      tap(() => {
        this.isLoading.set(true);
      }),
      switchMap((q) =>
        this.playlistJamendoApi.searchTracks(q).pipe(
          tap(() => {
            this.isLoading.set(false);
          }),
          catchError(() => {
            this.isLoading.set(false);
            return of([] as SearchTrack[]);
          }),
        ),
      ),
    ),
    { initialValue: [] as SearchTrack[] },
  );

  protected onAdd(track: SearchTrack): void {
    this.trackSelected.emit(track);
  }

  protected clearQuery(): void {
    this.query.set('');
  }
}
