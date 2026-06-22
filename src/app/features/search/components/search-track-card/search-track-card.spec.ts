import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SearchTrackCard } from './search-track-card';

describe('SearchTrackCard', () => {
  let component: SearchTrackCard;
  let fixture: ComponentFixture<SearchTrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTrackCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTrackCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
