import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RecentlyPlayedFilterDto } from '@features/library/interfaces/library-api.model';
import { TuiDay, type TuiDayRange } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiTextfield } from '@taiga-ui/core';
import { TuiCalendarRange } from '@taiga-ui/kit';
import { tuiCreateDefaultDayRangePeriods, TuiInputDateRange } from '@taiga-ui/kit';

@Component({
  selector: 'app-recently-played-filter',
  imports: [ReactiveFormsModule, TuiButton, TuiCalendarRange, TuiDropdown, TuiInputDateRange, TuiTextfield],
  templateUrl: './recently-played-filter.html',
  styleUrl: './recently-played-filter.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedFilter {
  readonly filterApplied = output<RecentlyPlayedFilterDto>();
  readonly filterCleared = output();

  readonly dateRangeControl = new FormControl<TuiDayRange | null>(null);

  /** Default Taiga UI periods: Today, Yesterday, Last week, Last month, etc. */
  readonly items = tuiCreateDefaultDayRangePeriods();

  get hasValue(): boolean {
    return this.dateRangeControl.value !== null;
  }

  onApply(): void {
    const range = this.dateRangeControl.value;
    if (!range) return;

    this.filterApplied.emit({
      from: tuiDayToIso(range.from),
      to: tuiDayToIso(range.to),
    });
  }

  onClear(): void {
    this.dateRangeControl.setValue(null);
    this.filterCleared.emit();
  }
}

/**
 * Converts a TuiDay to an ISO 8601 date string (yyyy-mm-dd).
 * TuiDay.month is 0-indexed (same as JS Date), so we add 1.
 */
function tuiDayToIso(day: TuiDay): string {
  const month = String(day.month + 1).padStart(2, '0');
  const date = String(day.day).padStart(2, '0');
  return `${day.year.toString()}-${month}-${date}`;
}
