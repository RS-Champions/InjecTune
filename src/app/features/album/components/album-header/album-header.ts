import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from '@features/album/interfaces/album.model';
import { FormatDurationPipe } from '@shared/track/pipes/format-duration-pipe';
import { TuiButton, TuiHint, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-album-header',
  imports: [DatePipe, FormatDurationPipe, RouterLink, TuiButton, TuiHint, TuiIcon],
  templateUrl: './album-header.html',
  styleUrl: './album-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumHeader {
  readonly album = input.required<Album>();
  readonly isPlayingAll = input(false);

  readonly playAll = output();

  onPlayAll(): void {
    this.playAll.emit();
  }
}
