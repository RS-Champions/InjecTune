import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { authInterceptor } from './auth-interceptor';

const interceptor: HttpInterceptorFn = (request, next) =>
  TestBed.runInInjectionContext(() => authInterceptor(request, next));

describe('authInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
