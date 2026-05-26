import { DurationFilter, SearchFilters } from '../interfaces/search-filters';

interface DurationRange {
  max?: number;
  min?: number;
}

const DURATION_RANGES: Record<NonNullable<DurationFilter>, DurationRange> = {
  short: { max: 180 },
  medium: { min: 180, max: 300 },
  long: { min: 300 },
};

/**
 * Converts a UI duration filter value to API min/max parameters.
 * Returns an empty object when duration is null (no filter applied).
 */
export function mapDurationToApiParametrs(duration: DurationFilter): Pick<SearchFilters, 'durationMin' | 'durationMax'> {
  if (!duration) return {};

  const range = DURATION_RANGES[duration];

  return {
    ...(range.min !== undefined && { durationMin: range.min }),
    ...(range.max !== undefined && { durationMax: range.max }),
  };
}

/**
 * Reverse-maps API durationMin/Max parameters back to a UI DurationFilter value.
 * Returns null when no duration filter is active.
 */

export function mapApiParametrsToDuration(filters: Pick<SearchFilters, 'durationMin' | 'durationMax'>): DurationFilter {
  const { durationMin, durationMax } = filters;

  if (durationMin === undefined && durationMax === undefined) return null;

  for (const [key, range] of Object.entries(DURATION_RANGES) as [NonNullable<DurationFilter>, DurationRange][]) {
    if (range.min === durationMin && range.max === durationMax) {
      return key;
    }
  }

  return null;
}
