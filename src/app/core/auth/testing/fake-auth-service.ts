import { signal } from '@angular/core';
import { of } from 'rxjs';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { User } from '@core/auth/interfaces/user';

/* eslint-disable  @typescript-eslint/non-nullable-type-assertion-style */
export class FakeAuthService implements AuthServiceAbstract {
  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  setUser(user: User | null): void {
    this._currentUser.set(user);
  }

  register(): ReturnType<AuthServiceAbstract['register']> {
    return of(this._currentUser() as User);
  }

  login(): ReturnType<AuthServiceAbstract['login']> {
    return of(this._currentUser() as User);
  }

  logout(): ReturnType<AuthServiceAbstract['logout']> {
    this._currentUser.set(null);
    return of(undefined); // eslint-disable-line unicorn/no-useless-undefined
  }
}
