import { TestBed } from '@angular/core/testing';

import { LibraryApi } from './library.api';

describe('LibraryApi', () => {
  let service: LibraryApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
