import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { PlayerStore } from './player.store';

describe('PlayerStore', () => {
  let service: PlayerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
