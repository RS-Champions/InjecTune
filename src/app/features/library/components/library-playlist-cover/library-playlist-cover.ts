import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { of, catchError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { LibraryApi } from '@features/library/services/library.api';
import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { MAX_COVER_IMAGES } from '@shared/constants/constants';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-library-playlist-cover',
  imports: [TuiIcon],
  templateUrl: './library-playlist-cover.html',
  styleUrl: './library-playlist-cover.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPlaylistCover {
  private readonly libraryApi = inject(LibraryApi);
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);

  readonly playlistId = input.required<string>();
  readonly playlistName = input.required<string>();

  readonly detailsResource = this.libraryApi.playlistDetailsResource(this.playlistId);

  readonly tracksResource = rxResource({
    params: () => {
      const resourceError = this.detailsResource.error();
      const resourceValue = this.detailsResource.value();
      if (resourceError) return null;
      return resourceValue?.playlist_tracks ?? [];
    },
    stream: ({ params: playlistTracks }) => {
      if (!playlistTracks || playlistTracks.length === 0) {
        return of([] as EnrichedPlaylistTrack[]);
      }
      return this.playlistJamendoApi.enrichTracks(playlistTracks).pipe(catchError(() => of([] as EnrichedPlaylistTrack[])));
    },
  });

  readonly tracks = computed(() => this.tracksResource.value() ?? []);

  readonly coverImages = computed(() =>
    this.tracks()
      .map((t) => t.image)
      .filter(Boolean)
      .slice(0, MAX_COVER_IMAGES),
  );
}
