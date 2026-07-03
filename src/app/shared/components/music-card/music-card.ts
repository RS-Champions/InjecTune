import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { Track } from '@shared/track/directives/track';
import { MusicTrack } from '@shared/track/interfaces/music-track';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-music-card',
  imports: [Equalizer, DatePipe, TuiButton],
  templateUrl: './music-card.html',
  styleUrl: './music-card.less',
  host: {
    '[class.active]': 'isPlaying()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicCard extends Track<MusicTrack> {}
