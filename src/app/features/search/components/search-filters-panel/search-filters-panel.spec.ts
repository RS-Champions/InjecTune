import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersPanel } from './search-filters-panel';

describe('SearchFiltersPanel', () => {
  let component: SearchFiltersPanel;
  let fixture: ComponentFixture<SearchFiltersPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
