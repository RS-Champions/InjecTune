import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { LIBRARY_API_URL } from '@core/tokens/library.tokens';
import { AuthCredentials } from '../interfaces/auth-credentials';
import { User } from '../interfaces/user';
import { BackendAuthService } from './backend-auth-service';

const BASE_URL = 'http://localhost:3000';
const CURRENT_USER_KEY = 'auth:current_user';

const testUser: User = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'test@example.com',
  token: 'jwt-token-123',
};

const testCredentials: AuthCredentials = {
  email: 'test@example.com',
  password: 'password123',
};

describe('BackendAuthService', () => {
  let service: BackendAuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: LIBRARY_API_URL, useValue: BASE_URL }],
    });

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    service = TestBed.inject(BackendAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('has no current user when localStorage is empty', () => {
      expect(service.currentUser()).toBeNull();
    });

    it('restores the current user from localStorage on construction', () => {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(testUser));

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting(), { provide: LIBRARY_API_URL, useValue: BASE_URL }],
      });

      const restoredService = TestBed.inject(BackendAuthService);

      expect(restoredService.currentUser()).toEqual(testUser);
    });
  });

  describe('register', () => {
    it('POSTs credentials to /auth/register', () => {
      service.register(testCredentials).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/auth/register`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(testCredentials);

      request.flush(testUser);
    });

    it('sets currentUser and persists to localStorage on success', () => {
      service.register(testCredentials).subscribe();

      httpMock.expectOne(`${BASE_URL}/auth/register`).flush(testUser);

      expect(service.currentUser()).toEqual(testUser);
      expect(JSON.parse(localStorage.getItem(CURRENT_USER_KEY) ?? 'null')).toEqual(testUser);
    });

    it('propagates a readable error message on 409 conflict', () => {
      let capturedError: Error | undefined;

      service.register(testCredentials).subscribe({
        error: (error: Error) => {
          capturedError = error;
        },
      });

      httpMock
        .expectOne(`${BASE_URL}/auth/register`)
        .flush({ message: 'User with this email already exists' }, { status: 409, statusText: 'Conflict' });

      expect(capturedError?.message).toBe('User with this email already exists');
      expect(service.currentUser()).toBeNull();
    });

    it('joins array-shaped validation messages into a single string', () => {
      let capturedError: Error | undefined;

      service.register(testCredentials).subscribe({
        error: (error: Error) => {
          capturedError = error;
        },
      });

      httpMock
        .expectOne(`${BASE_URL}/auth/register`)
        .flush({ message: ['email must be an email', 'password too short'] }, { status: 400, statusText: 'Bad Request' });

      expect(capturedError?.message).toBe('email must be an email, password too short');
    });

    it('falls back to a generic message when the error body has no message', () => {
      let capturedError: Error | undefined;

      service.register(testCredentials).subscribe({
        error: (error: Error) => {
          capturedError = error;
        },
      });

      httpMock.expectOne(`${BASE_URL}/auth/register`).flush(null, { status: 500, statusText: 'Server Error' });

      expect(capturedError?.message).toBe('An unexpected error occurred.');
    });
  });

  describe('login', () => {
    it('POSTs credentials to /auth/login', () => {
      service.login(testCredentials).subscribe();

      const request = httpMock.expectOne(`${BASE_URL}/auth/login`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(testCredentials);

      request.flush(testUser);
    });

    it('sets currentUser and persists to localStorage on success', () => {
      service.login(testCredentials).subscribe();

      httpMock.expectOne(`${BASE_URL}/auth/login`).flush(testUser);

      expect(service.currentUser()).toEqual(testUser);
      expect(JSON.parse(localStorage.getItem(CURRENT_USER_KEY) ?? 'null')).toEqual(testUser);
    });

    it('propagates a readable error message on 401 unauthorized', () => {
      let capturedError: Error | undefined;

      service.login(testCredentials).subscribe({
        error: (error: Error) => {
          capturedError = error;
        },
      });

      httpMock
        .expectOne(`${BASE_URL}/auth/login`)
        .flush({ message: 'Invalid email or password' }, { status: 401, statusText: 'Unauthorized' });

      expect(capturedError?.message).toBe('Invalid email or password');
      expect(service.currentUser()).toBeNull();
    });
  });

  describe('logout', () => {
    it('clears currentUser, removes localStorage entry, and redirects to /login', () => {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(testUser));
      service.login(testCredentials).subscribe();
      httpMock.expectOne(`${BASE_URL}/auth/login`).flush(testUser);
      expect(service.currentUser()).toEqual(testUser);

      service.logout().subscribe();

      expect(service.currentUser()).toBeNull();
      expect(localStorage.getItem(CURRENT_USER_KEY)).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
