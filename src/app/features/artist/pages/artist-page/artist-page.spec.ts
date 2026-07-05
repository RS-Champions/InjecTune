import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { FakeAuthService } from '@core/auth/testing/fake-auth-service';
import { ArtistPage } from './artist-page';

describe('ArtistPage', () => {
  let component: ArtistPage;
  let fixture: ComponentFixture<ArtistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPage],
      providers: [provideRouter([]), { provide: AuthServiceAbstract, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
