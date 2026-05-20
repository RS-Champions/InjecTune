import { TestBed } from '@angular/core/testing';

import { DiscoverApi } from './discover-api';

describe('DiscoverApi', () => {
  let service: DiscoverApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
