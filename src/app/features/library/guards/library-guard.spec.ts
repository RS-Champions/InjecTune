import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { User } from '@core/auth/interfaces/user';
import { libraryGuard } from './library-guard';

const executeGuard: CanActivateFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => libraryGuard(...guardParameters));

class FakeAuthService implements Pick<AuthServiceAbstract, 'currentUser'> {
  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  setUser(user: User | null): void {
    this._currentUser.set(user);
  }
}

describe('libraryGuard', () => {
  let authService: FakeAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthServiceAbstract, useClass: FakeAuthService }],
    });

    authService = TestBed.inject(AuthServiceAbstract) as unknown as FakeAuthService;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('allows access when the user is authenticated', () => {
    authService.setUser({ id: '00000000-0000-0000-0000-000000000001', email: 'user1@example.com', token: 'token1' });

    const result = executeGuard({} as never, {} as never);

    expect(result).toBe(true);
  });

  it('redirects to /discover when the user is not authenticated', () => {
    authService.setUser(null);

    const result = executeGuard({} as never, {} as never);

    expect((result as UrlTree).toString()).toBe(router.parseUrl('/discover').toString());
  });
});
