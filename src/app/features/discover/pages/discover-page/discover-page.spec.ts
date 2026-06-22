import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverPage } from './discover-page';
import { provideRouter } from '@angular/router';

describe('DiscoverPage', () => {
  let component: DiscoverPage;
  let fixture: ComponentFixture<DiscoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
