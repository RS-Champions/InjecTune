import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailsPage } from './playlist-details-page';
import { provideRouter } from '@angular/router';

describe('PlaylistDetailsPage', () => {
  let component: PlaylistDetailsPage;
  let fixture: ComponentFixture<PlaylistDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDetailsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
