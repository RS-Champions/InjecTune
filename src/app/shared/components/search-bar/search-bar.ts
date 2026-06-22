import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, skip, tap } from 'rxjs';
import { PageName } from '@shared/constants/page-name';
import { TuiIcon, TuiInput, TuiTextfield } from '@taiga-ui/core';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, TuiIcon, TuiInput, TuiTextfield],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly query = toSignal(this.route.queryParamMap.pipe(map((parameters) => parameters.get('search') ?? '')), {
    initialValue: this.route.snapshot.queryParamMap.get('search') ?? '',
  });

  protected inputValue = linkedSignal(() => this.query());

  protected readonly debouncedQuery = toSignal(
    toObservable(this.inputValue).pipe(
      skip(1),
      debounceTime(500),
      distinctUntilChanged(),
      tap((query) => {
        this.navigateWith(query);
      }),
    ),
    { initialValue: this.inputValue() },
  );

  private navigateWith(query: string): void {
    const onSearchPage = this.router.url.startsWith(`/${PageName.SEARCH}`);

    void this.router.navigate([PageName.SEARCH], {
      queryParams: { search: query || null },
      queryParamsHandling: 'merge',
      replaceUrl: onSearchPage,
    });
  }
}
