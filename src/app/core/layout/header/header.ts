import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'app-header',
  imports: [SearchBar, TuiAvatar, TuiDataList, TuiDropdown, TuiIcon, TuiNavigation],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'desktop-header',
  },
})
export class Header {
  private readonly authService = inject(AuthServiceAbstract);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly isMenuOpen = signal(false);

  logout(): void {
    this.isMenuOpen.set(false);
    this.authService.logout().subscribe();
  }
}
