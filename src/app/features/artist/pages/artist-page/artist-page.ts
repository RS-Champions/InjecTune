import { httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { ArtistAlbumCard } from '@features/artist/components/artist-album-card/artist-album-card';
import { ArtistHeader } from '@features/artist/components/artist-header/artist-header';
import { ArtistTrackCard } from '@features/artist/components/artist-track-card/artist-track-card';
import { Artist, ArtistAlbum, ArtistTrack } from '@features/artist/interfaces/artist.model';
import { ArtistApi } from '@features/artist/services/artist-api';
import { LoadingSkeleton, PageName } from '@shared/components/loading-skeleton/loading-skeleton';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

@Component({
  selector: 'app-artist-page',
  imports: [ArtistAlbumCard, ArtistHeader, ArtistTrackCard, LoadingSkeleton, RouterLink],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  private readonly artistApi = inject(ArtistApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly pageName = PageName.ARTIST;

  private readonly artistId = toSignal(this.route.params.pipe(map((p) => p['id'] as string)), {
    initialValue: this.route.snapshot.params['id'] as string,
  });

  // reactive album IDs — derived from albumsResource
  private readonly albumIds = computed<string[]>(
    () => this.albumsResource.value()?.results[0]?.albums?.map((a) => a.id) ?? [],
  );

  // uses rxResource to handle Observable from fetchAlbumTrackCounts
  // automatically re-fetches when albumIds change
  private readonly albumTrackCountsResource = rxResource({
    params: () => ({ ids: this.albumIds() }),
    stream: ({ params }) => this.artistApi.fetchAlbumTrackCounts(params.ids),
  });

  protected readonly albumsResource = httpResource<JamendoResponse<Artist>>(() => ({
    url: this.artistApi.artistsAlbumsUrl,
    params: this.artistApi.albumsParams(this.artistId()),
  }));

  protected readonly tracksResource = httpResource<JamendoResponse<ArtistTrack>>(() => ({
    url: this.artistApi.tracksUrl,
    params: this.artistApi.tracksParams(this.artistId()),
  }));

  protected readonly artist = computed<Artist | null>(() => {
    const albumsResult = this.albumsResource.value()?.results[0];
    const tracksResult = this.tracksResource.value()?.results;
    const trackCountMap = this.albumTrackCountsResource.value();

    if (!albumsResult) return null;

    const albums: ArtistAlbum[] =
      albumsResult.albums?.map((album) => ({
        ...album,
        tracksCount: trackCountMap?.get(album.id),
      })) ?? [];

    return {
      ...albumsResult,
      albums,
      tracks: tracksResult ?? [],
    } satisfies Artist;
  });

  protected readonly currentTrack = signal<ArtistTrack | null>(null);

  protected get isLoading(): boolean {
    return this.albumsResource.status() === 'loading' || this.tracksResource.status() === 'loading';
  }

  protected get hasError(): boolean {
    return this.albumsResource.status() === 'error' || this.tracksResource.status() === 'error';
  }

  protected onPlay(track: ArtistTrack): void {
    if (this.currentTrack()?.id !== track.id) this.currentTrack.set(track);
  }

  protected onPause(track: ArtistTrack): void {
    if (this.currentTrack()?.id === track.id) this.currentTrack.set(null);
  }

  protected navigateToAlbum(albumId: string): void {
    void this.router.navigate(['album', albumId]);
  }
}
