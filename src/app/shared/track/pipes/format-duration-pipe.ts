import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number): string {
    if (!Number.isFinite(duration)) {
      return '0:00';
    }

    const seconds = duration % 60;
    const minutes = (duration - seconds) / 60;

    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
  }
}
