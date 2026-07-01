import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number | string | undefined): string {
    const time = Math.round(Number(duration));

    if (!Number.isFinite(time)) {
      return '00:00';
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours ? `${hours.toString()}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
