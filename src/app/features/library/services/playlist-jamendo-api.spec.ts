import { TestBed } from '@angular/core/testing';

import { PlaylistJamendoApi } from './playlist-jamendo-api';

describe('PlaylistJamendoApi', () => {
  let service: PlaylistJamendoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistJamendoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
