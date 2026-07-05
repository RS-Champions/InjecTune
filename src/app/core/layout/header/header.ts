import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BackendAuthService } from '@core/auth/services/backend-auth-service';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { TuiButton } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'app-header',
  imports: [SearchBar, TuiAvatar, TuiButton, TuiNavigation],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'desktop-header',
  },
})
export class Header {
  private readonly authService = inject(BackendAuthService);
  protected readonly isAuthorized = Boolean(this.authService.currentUser());

  logout(): void {
    this.authService.logout().subscribe();
  }
}
