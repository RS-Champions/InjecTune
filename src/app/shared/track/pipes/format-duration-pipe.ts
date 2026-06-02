import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number | string): string {
    const time = Number(duration);

    if (!Number.isFinite(time)) {
      return '00:00';
    }

    const seconds = time % 60;
    const minutes = (time - seconds) / 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
