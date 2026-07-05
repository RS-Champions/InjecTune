import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { FakeAuthService } from '@core/auth/testing/fake-auth-service';
import { PlaylistDetailsPage } from './playlist-details-page';

describe('PlaylistDetailsPage', () => {
  let component: PlaylistDetailsPage;
  let fixture: ComponentFixture<PlaylistDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDetailsPage],
      providers: [provideRouter([]), { provide: AuthServiceAbstract, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailsPage);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', 'playlistId');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
