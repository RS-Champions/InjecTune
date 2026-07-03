import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { PageName } from '@shared/constants/page-name';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthServiceAbstract);
  const router = inject(Router);

  if (authService.currentUser()) {
    return router.parseUrl(`/${PageName.DISCOVER}`);
  }

  return true;
};
