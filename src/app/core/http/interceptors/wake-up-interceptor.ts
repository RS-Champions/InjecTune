import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import { WakingUpState } from '../services/waking-up-state';

export const wakeUpInterceptor: HttpInterceptorFn = (request, next) => {
  const backendUrl = inject(LIBRARY_API_URL);

  if (!request.url.startsWith(backendUrl)) {
    return next(request);
  }

  const wakingUpState = inject(WakingUpState);
  wakingUpState.requestStarted();

  return next(request).pipe(
    finalize(() => {
      wakingUpState.requestFinished();
    }),
  );
};
