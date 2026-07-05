import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';

export const libraryGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthServiceAbstract);

  return authService.currentUser() ? true : router.parseUrl('/discover');
};
