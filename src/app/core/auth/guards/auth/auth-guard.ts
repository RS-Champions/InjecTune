import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceInterface } from '../../services/auth-service-interface/auth-service-interface';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthServiceInterface);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  return router.parseUrl('/login');
};
