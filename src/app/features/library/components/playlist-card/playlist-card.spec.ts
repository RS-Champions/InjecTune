import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCard } from './playlist-card';
import { PlaylistItem } from '@features/library/interfaces/library.model';

describe('PlaylistCard', () => {
  let component: PlaylistCard;
  let fixture: ComponentFixture<PlaylistCard>;

  const mockPlaylist: PlaylistItem = {
    id: '1',
    name: 'Favorites',
    meta: '12 songs',
    cover: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('playlist', mockPlaylist);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
