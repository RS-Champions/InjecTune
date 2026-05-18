import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTrackCard } from './album-track-card';

describe('AlbumTrackCard', () => {
  let component: AlbumTrackCard;
  let fixture: ComponentFixture<AlbumTrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumTrackCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumTrackCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
