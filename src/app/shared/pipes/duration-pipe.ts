import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');

    const ss = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

    return `${mm}:${ss}`;
  }
}
