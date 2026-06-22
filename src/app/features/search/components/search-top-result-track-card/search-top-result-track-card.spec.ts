import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SearchTopResultTrackCard } from './search-top-result-track-card';
import { SearchTrack } from '@features/search/interfaces/search-track';

describe('SearchTopResultTrackCard', () => {
  let component: SearchTopResultTrackCard;
  let fixture: ComponentFixture<SearchTopResultTrackCard>;

  const mockTrack: SearchTrack = {
    id: '1',
    name: 'Test Track',
    image: '/test.jpg',
    duration: 180,
    artist_id: '10',
    artist_name: 'Test Artist',
    album_id: '100',
    album_name: 'Test Album',
    stats: {
      rate_listened_total: 123,
    },
  } as SearchTrack;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTopResultTrackCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTopResultTrackCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('track', mockTrack);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
