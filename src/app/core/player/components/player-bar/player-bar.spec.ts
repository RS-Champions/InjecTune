import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { FakeAuthService } from '@core/auth/testing/fake-auth-service';
import { PlayerBar } from './player-bar';

describe('PlayerBar', () => {
  let component: PlayerBar;
  let fixture: ComponentFixture<PlayerBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerBar],
      providers: [{ provide: AuthServiceAbstract, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
