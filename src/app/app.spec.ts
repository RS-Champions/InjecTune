import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TUI_OPTIONS } from '@taiga-ui/core';
import { provideZoneChangeDetection } from '@angular/core';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: TUI_OPTIONS, useValue: {} }, provideZoneChangeDetection()],
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
