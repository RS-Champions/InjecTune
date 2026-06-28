import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTrackSearch } from './playlist-track-search';

describe('PlaylistTrackSearch', () => {
  let component: PlaylistTrackSearch;
  let fixture: ComponentFixture<PlaylistTrackSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistTrackSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistTrackSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
