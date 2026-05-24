import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equalizer } from './equalizer';

describe('Equalizer', () => {
  let component: Equalizer;
  let fixture: ComponentFixture<Equalizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equalizer],
    }).compileComponents();

    fixture = TestBed.createComponent(Equalizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
