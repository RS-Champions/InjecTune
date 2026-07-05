import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import { AuthServiceAbstract } from '../services/auth-service-interface/auth-service-interface';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const baseUrl = inject(LIBRARY_API_URL);
  const authService = inject(AuthServiceAbstract);

  const isBackendRequest = request.url.startsWith(baseUrl);
  const token = authService.currentUser()?.token;

  const authRequest =
    isBackendRequest && token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;

  return next(authRequest).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && isBackendRequest) {
        authService.logout().subscribe();
      }
      return throwError(() => error);
    }),
  );
};
