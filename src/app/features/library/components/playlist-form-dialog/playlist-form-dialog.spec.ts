import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFormDialog } from './playlist-form-dialog';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('PlaylistFormDialog', () => {
  let component: PlaylistFormDialog;
  let fixture: ComponentFixture<PlaylistFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistFormDialog],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {},

            completeWith: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
