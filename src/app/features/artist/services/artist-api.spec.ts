import { TestBed } from '@angular/core/testing';

import { ArtistApi } from './artist-api';

describe('ArtistApi', () => {
  let service: ArtistApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
