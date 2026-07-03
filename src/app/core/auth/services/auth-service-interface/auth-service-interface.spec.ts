import { TestBed } from '@angular/core/testing';

import { AuthServiceAbstract } from './auth-service-interface';

describe('AuthServiceAbstract', () => {
  let service: AuthServiceAbstract;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceAbstract);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
