import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ArtistHeader } from '@features/artist/components/artist-header/artist-header';
import { ArtistTrackCard } from '@features/artist/components/artist-track-card/artist-track-card';
import { Artist, ArtistTrack } from '@features/artist/interfaces/artist.model';
import { ArtistApi } from '@features/artist/services/artist-api';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-artist-page',
  imports: [ArtistHeader, ArtistTrackCard, TuiSkeleton],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  private readonly artistApi = inject(ArtistApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly artistId = toSignal(this.route.params.pipe(map((p) => p['id'] as string)), {
    initialValue: this.route.snapshot.params['id'] as string,
  });

  protected readonly albumsResource = httpResource<JamendoResponse<Artist>>(() => ({
    url: this.artistApi.albumsUrl,
    params: this.artistApi.albumsParams(this.artistId()),
  }));

  protected readonly tracksResource = httpResource<JamendoResponse<ArtistTrack>>(() => ({
    url: this.artistApi.tracksUrl,
    params: this.artistApi.tracksParams(this.artistId()),
  }));

  protected readonly artist = computed<Artist | null>(() => {
    const albumsResult = this.albumsResource.value()?.results[0];
    const tracksResult = this.tracksResource.value()?.results;

    if (!albumsResult) return null;

    return {
      ...albumsResult,
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
