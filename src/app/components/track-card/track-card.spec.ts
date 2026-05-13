import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackCardComponent } from './track-card';
import { MOCK_TRACKS } from '../../mock/mock-tracks';

describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCardComponent);
    fixture.componentRef.setInput('track', MOCK_TRACKS[0]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});