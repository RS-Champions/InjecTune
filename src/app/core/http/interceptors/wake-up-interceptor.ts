import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { WakingUpState } from '../services/waking-up-state';

export const wakeUpInterceptor: HttpInterceptorFn = (request, next) => {
  const wakingUpState = inject(WakingUpState);

  wakingUpState.requestStarted();

  return next(request).pipe(finalize(() => { wakingUpState.requestFinished(); }));
};
