import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, retry, switchMap, throwError, timer } from 'rxjs';
import { JAMENDO_API_URL } from '@core/tokens/jamendo.tokens';
import { DELAY_MS, MAX_RETRIES } from '@shared/constants/constants';
import { JamendoResponse } from '@shared/interfaces/jamendo-response';

/**
 * Marks a technically-successful (200 OK) Jamendo response as empty when it
 * shouldn't be — thrown so the same retry() below can treat it the same
 * way as a real HttpErrorResponse, instead of needing separate handling.
 */
class EmptyJamendoResultError extends Error {}

function isEmptyJamendoResult(body: unknown): boolean {
  const response = body as JamendoResponse<unknown> | null;
  return Array.isArray(response?.results) && response.results.length === 0;
}

/**
 * Retries Jamendo requests on:
 *  - 429 / 5xx HTTP errors (network/server-level failures), and
 *  - a 200 OK response whose `results` array is unexpectedly empty —
 *    confirmed to happen on Jamendo's side: the exact same request,
 *    retried moments later, can return real results. This is NOT an
 *    HTTP error, so a status-code-only retry never catches it.
 *
 * Trade-off worth knowing: this can't distinguish "Jamendo glitched" from
 * "this search genuinely has zero matches" — a real empty search result
 * now costs a few wasted retries (up to ~3.5s of backoff) before settling
 * on "no results". Given how frequently the glitch was reproducing, that
 * cost was judged worth it; narrow this to only id-based lookups (where
 * we already know the ids are valid, since we stored them ourselves) if
 * that latency on empty searches becomes annoying.
 *
 * Deliberately does NOT retry 4xx client errors (400, 404, etc.) — those
 * mean something about the request itself is wrong, and retrying would
 * just fail identically while masking the real error.
 */
export const jamendoRetryInterceptor: HttpInterceptorFn = (request, next) => {
  const jamendoApiUrl = inject(JAMENDO_API_URL);

  if (!request.url.startsWith(jamendoApiUrl)) {
    return next(request);
  }

  return next(request).pipe(
    switchMap((event) => {
      if (event instanceof HttpResponse && isEmptyJamendoResult(event.body)) {
        return throwError(() => new EmptyJamendoResultError('Jamendo returned an empty result set'));
      }
      return of(event);
    }),
    retry({
      count: MAX_RETRIES,
      delay: (error: unknown, retryCount: number) => {
        const isRetryableHttpError = error instanceof HttpErrorResponse && (error.status === 429 || error.status >= 500);
        const isRetryableEmptyResult = error instanceof EmptyJamendoResultError;

        if (!isRetryableHttpError && !isRetryableEmptyResult) {
          throw error;
        }

        return timer(DELAY_MS * 2 ** (retryCount - 1));
      },
    }),
  );
};
