import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { PlaylistDetailsPage } from '@features/library/pages/playlist-details-page/playlist-details-page';
import { playlistEmptyGuard } from './playlist-empty-guard';

const executeGuard: CanDeactivateFn<PlaylistDetailsPage> = (...guardParameters) =>
  TestBed.runInInjectionContext(() => playlistEmptyGuard(...guardParameters));

describe('playlistEmptyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
