import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number | string | undefined): string {
    const time = Number(duration);

    if (!Number.isFinite(time)) {
      return '00:00';
    }

    const seconds = (time % 60).toFixed(0);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) - (hours ? hours * 60 : 0);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
    return `${hours ? hours.toString() : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
