import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guestGuard } from './guest-guard';

const executeGuard: CanActivateFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => guestGuard(...guardParameters));
describe('guestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
