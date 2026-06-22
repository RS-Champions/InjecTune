import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPage } from './album-page';
import { provideRouter } from '@angular/router';

describe('AlbumPage', () => {
  let component: AlbumPage;
  let fixture: ComponentFixture<AlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
