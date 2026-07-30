import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, take } from 'rxjs';

import { LIBRARY_API_URL } from '@core/tokens/library.tokens';

@Injectable({
  providedIn: 'root',
})
export class WarmupService {
  private readonly http = inject(HttpClient);
  private readonly backendUrl = inject(LIBRARY_API_URL);

  warmup(): void {
    const start = Date.now();
    console.log('[Warmup] started' + ` ${this.backendUrl}/`);
    this.http
      .get(`${this.backendUrl}/`)
      .pipe(
        take(1),
        finalize(() => {
          console.log('[Warmup] completed', Date.now() - start);
        }),
        catchError(() => {
          return [];
        }),
      )
      .subscribe();
  }
}
