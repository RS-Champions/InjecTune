import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { EnrichedPlaylistTrack } from '@features/library/interfaces/library-api.model';
import { LibraryApi } from '@features/library/services/library.api';
import { PlaylistJamendoApi } from '@features/library/services/playlist-jamendo-api';
import { LoadingSkeleton } from '@shared/components/loading-skeleton/loading-skeleton';
import { PageName } from '@shared/constants/page-name';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-playlist-details-page',
  imports: [FormatDurationPipe, LoadingSkeleton, TuiButton, TuiIcon],
  templateUrl: './playlist-details-page.html',
  styleUrl: './playlist-details-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly libraryApi = inject(LibraryApi);
  private readonly playlistJamendoApi = inject(PlaylistJamendoApi);

  readonly pageName = PageName.LIBRARY_PLAYLIST;

  // ── Route param ───────────────────────────────────────────────────────────

  private readonly idFromRoute = toSignal(this.route.params.pipe(map((p) => p['id'] as string | null)), {
    initialValue: this.route.snapshot.params['id'] as string | null,
  });

  // ── Playlist metadata (httpResource, factory pattern) ─────────────────────

  readonly detailsResource = this.libraryApi.playlistDetailsResource(this.idFromRoute);

  // ── Enriched tracks (rxResource: chains backend → Jamendo batch) ──────────

  readonly tracksResource = rxResource({
    params: () => this.detailsResource.value()?.playlist_tracks ?? [],
    stream: ({ params: playlistTracks }) => {
      if (playlistTracks.length === 0) return of([] as EnrichedPlaylistTrack[]);
      return this.playlistJamendoApi.enrichTracks(playlistTracks).pipe(catchError(() => of([] as EnrichedPlaylistTrack[])));
    },
  });

  // ── Derived state ─────────────────────────────────────────────────────────

  readonly playlist = computed(() => this.detailsResource.value());
  readonly tracks = computed(() => this.tracksResource.value() ?? []);
  readonly isLoading = computed(() => this.detailsResource.isLoading() || this.tracksResource.isLoading());

  /** Up to 4 unique track images for the cover collage */
  readonly coverImages = computed(() =>
    this.tracks()
      .map((t) => t.image)
      .filter(Boolean)
      .slice(0, 4),
  );

  readonly totalDuration = computed(() => this.tracks().reduce((sum, t) => sum + Number(t.duration), 0));
}
