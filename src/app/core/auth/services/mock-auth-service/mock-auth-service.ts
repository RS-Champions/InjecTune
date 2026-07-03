import { computed, Injectable, signal } from '@angular/core';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { DELAY_MS } from '@shared/constants/constants';
import { AuthCredentials } from '@core/auth/interfaces/auth-credentials';
import { User } from '@core/auth/interfaces/user';
import { AuthServiceAbstract } from '../auth-service-interface/auth-service-interface';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService implements AuthServiceAbstract {
  public readonly currentUser = computed(() => this._currentUser());

  private readonly USERS_DB_KEY = 'auth:users_db';
  private readonly CURRENT_USER_KEY = 'auth:current_user';
  private _currentUser = signal<User | null>(this.getStoredUser());

  public register(credentials: AuthCredentials): Observable<User> {
    const users = this.getUsersFromDb();

    if (users.some((user) => user.email === credentials.email)) {
      return throwError(() => new Error('User with this email exist')).pipe(delay(DELAY_MS));
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: credentials.email,
      token: `mock-jwt-token-${crypto.randomUUID()}`,
    };

    users.push({ ...newUser, password: credentials.password });
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(users));

    return of(newUser).pipe(
      delay(DELAY_MS),
      tap((user) => {
        this.setCurrentUser(user);
      }),
    );
  }

  public login(credentials: AuthCredentials): Observable<User> {
    const users = this.getUsersFromDb();
    const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);

    if (!user) {
      return throwError(() => new Error('Invalid email or password')).pipe(delay(DELAY_MS));
    }

    const userResponse: User = { id: user.id, email: user.email, token: user.token };

    return of(userResponse).pipe(
      delay(DELAY_MS),
      tap((u) => {
        this.setCurrentUser(u);
      }),
    );
  }

  public logout(): Observable<void> {
    return of().pipe(
      delay(DELAY_MS),
      tap(() => {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        this._currentUser.set(null);
      }),
    );
  }

  private getUsersFromDb(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_DB_KEY) ?? '[]') as User[];
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!user) return null;
    return JSON.parse(user) as User;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }
}
