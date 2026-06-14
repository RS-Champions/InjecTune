import { RepeatMode } from '@core/player';

export function isRepeatMode(value: string): value is RepeatMode {
  return value === 'off' || value === 'all' || value === 'one';
}
