import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPlayCount',
})
export class FormatPlayCountPipe implements PipeTransform {
  transform(value: number): string {
    if (Number.isNaN(value)) throw new Error(`${value.toString()} is not a number`);

    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }

    return value.toString();
  }
}
