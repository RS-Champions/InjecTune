import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { HasPlaylistState, playlistEmptyGuard } from './playlist-empty-guard';

const executeGuard: CanDeactivateFn<HasPlaylistState> = (...guardParameters) =>
  TestBed.runInInjectionContext(() => playlistEmptyGuard(...guardParameters));

describe('playlistEmptyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
