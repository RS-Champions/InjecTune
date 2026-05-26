import { TestBed } from '@angular/core/testing';

import { DiscoverStore } from './discover-store';

describe('DiscoverService', () => {
  let service: DiscoverStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
