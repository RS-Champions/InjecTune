import { Injectable, Signal } from '@angular/core';
import { AuthCredentials } from '@core/auth/interfaces/auth-credentials';
import { User } from '@core/auth/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthServiceAbstract {
  abstract readonly currentUser: Signal<User | null>;
  abstract register(credentials: AuthCredentials): Observable<User>;
  abstract login(credentials: AuthCredentials): Observable<User>;
  abstract logout(): Observable<void>;
}
