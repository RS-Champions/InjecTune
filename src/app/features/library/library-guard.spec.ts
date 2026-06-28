import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthService } from '@core/auth/services/auth.service';
import { libraryGuard } from './library-guard';

const executeGuard: CanActivateFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => libraryGuard(...guardParameters));

describe('libraryGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('allows access when the user is authenticated', () => {
    authService.authenticatedUserId.set('userId1');

    const result = executeGuard({} as never, {} as never);

    expect(result).toBe(true);
  });

  it('redirects to /discover when the user is not authenticated', () => {
    authService.authenticatedUserId.set(null);

    const result = executeGuard({} as never, {} as never);

    expect((result as UrlTree).toString()).toBe(router.parseUrl('/discover').toString());
  });
});
