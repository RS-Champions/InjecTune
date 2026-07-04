import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of, tap, catchError } from 'rxjs';
import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import { AuthCredentials } from '../interfaces/auth-credentials';
import { User } from '../interfaces/user';
import { AuthServiceAbstract } from './auth-service-interface/auth-service-interface';

@Injectable({
  providedIn: 'root',
})
export class BackendAuthService implements AuthServiceAbstract {
  public readonly currentUser = computed(() => this._currentUser());

  private readonly CURRENT_USER_KEY = 'auth:current_user';

  private readonly baseUrl = inject(LIBRARY_API_URL);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private _currentUser = signal<User | null>(this.getStoredUser());

  public register(credentials: AuthCredentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, credentials).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public login(credentials: AuthCredentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  // there's no server-side session to invalidate with stateless JWTs, so client-side clear + redirect is correct as-is
  public logout(): Observable<void> {
    this._currentUser.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    void this.router.navigate(['/login']);
    return of();
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

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(this.extractMessage(error)));
  }

  private extractMessage(error: HttpErrorResponse): string {
    const body = error.error as { message?: string | string[] } | null;
    if (body?.message) {
      return Array.isArray(body.message) ? body.message.join(', ') : body.message;
    }
    return 'An unexpected error occurred.';
  }
}
