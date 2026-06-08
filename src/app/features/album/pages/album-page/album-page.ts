import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { PlayerStore } from '@core/player';
import { AudioEngine } from '@core/player/services/audio-engine';
import { AlbumHeader } from '@features/album/components/album-header/album-header';
import { AlbumTrackCard } from '@features/album/components/album-track-card/album-track-card';
import { Album, AlbumTrack } from '@features/album/interfaces/album.model';
import { AlbumApi } from '@features/album/services/album-api';
import { LoadingSkeleton, PageName } from '@shared/components/loading-skeleton/loading-skeleton';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';
import { BaseTrack } from '@shared/track/interfaces/base-track';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-album-page',
  imports: [AlbumHeader, AlbumTrackCard, LoadingSkeleton, TuiIcon],
  templateUrl: './album-page.html',
  styleUrl: './album-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPage {
  private readonly albumApi = inject(AlbumApi);
  private readonly route = inject(ActivatedRoute);

  protected readonly audio = inject(AudioEngine);
  protected readonly store = inject(PlayerStore);

  protected readonly pageName = PageName.ALBUM;

  protected readonly currentTrack = this.store.currentTrack;

  private readonly albumId = toSignal(this.route.params.pipe(map((p) => p['id'] as string)), {
    initialValue: this.route.snapshot.params['id'] as string,
  });

  protected readonly albumResource = httpResource<JamendoResponse<Album>>(() => ({
    url: this.albumApi.albumsUrl,
    params: this.albumApi.albumsParams(this.albumId()),
  }));

  protected readonly tracksResource = httpResource<JamendoResponse<AlbumTrack>>(() => ({
    url: this.albumApi.tracksUrl,
    params: this.albumApi.tracksParams(this.albumId()),
  }));

  protected readonly tracks = computed(() =>
    (this.tracksResource.value()?.results ?? []).toSorted((a, b) => a.position - b.position),
  );

  protected readonly totalDuration = computed(() => {
    let duration = 0;

    for (const track of this.tracks()) {
      const time = Number(track.duration);
      if (Number.isFinite(time)) {
        duration += time;
      }
    }

    return duration;
  });

  protected readonly album = computed<Album | null>(() => {
    const albumResult = this.albumResource.value()?.results[0];

    if (!albumResult) return null;

    return {
      ...albumResult,
      duration: this.totalDuration(),
      tracks: this.tracks(),
    } satisfies Album;
  });

  protected onPlayAll(): void {
    const tracks = this.album()?.tracks ?? [];
    const startIndex = 0;
    this.audio.playQueue(tracks as BaseTrack[], startIndex);
  }

  protected onPlay(track: AlbumTrack): void {
    this.audio.playTrack(track);
  }
}
