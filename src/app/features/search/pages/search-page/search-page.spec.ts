import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { FakeAuthService } from '@core/auth/testing/fake-auth-service';
import { SearchPage } from './search-page';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [provideRouter([]), { provide: AuthServiceAbstract, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
