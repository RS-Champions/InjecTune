import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { FakeAuthService } from '@core/auth/testing/fake-auth-service';
import { LibraryPage } from './library-page';

describe('LibraryPage', () => {
  let component: LibraryPage;
  let fixture: ComponentFixture<LibraryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPage],
      providers: [{ provide: AuthServiceAbstract, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
