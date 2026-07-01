import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'app-header',
  imports: [SearchBar, TuiNavigation],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'desktop-header',
  },
})
export class Header {}
