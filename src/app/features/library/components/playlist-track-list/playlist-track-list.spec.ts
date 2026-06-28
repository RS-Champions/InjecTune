import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTrackList } from './playlist-track-list';

describe('PlaylistTrackList', () => {
  let component: PlaylistTrackList;
  let fixture: ComponentFixture<PlaylistTrackList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistTrackList],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistTrackList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tracks', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
