import { TestBed } from '@angular/core/testing';

import { AuthServiceInterface } from './auth-service-interface';

describe('AuthServiceInterface', () => {
  let service: AuthServiceInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceInterface);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
