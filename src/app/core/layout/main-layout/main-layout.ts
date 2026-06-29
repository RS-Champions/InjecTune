import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from '@core/layout/header/header';
import { SidebarComponent } from '@shared/components/sidebar/sidebar';
import { HamburgerComponent } from '@shared/components/hamburger/hamburger';
import { NavItem } from '@shared/components/sidebar/sidebar';
import { PageName } from '@shared/constants/page-name';
import { TuiNavigation } from '@taiga-ui/layout';
import { PlayerBar } from '@core/player/components/player-bar/player-bar';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, HamburgerComponent, Header, RouterOutlet, SidebarComponent, TuiNavigation, PlayerBar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isMobile = signal(false);
  protected readonly sidebarOpen = signal(false);

  protected readonly navigationItems: NavItem[] = [
    { label: 'Discover', route: PageName.DISCOVER, icon: '@tui.compass' },
    { label: 'Search', route: PageName.SEARCH, icon: '@tui.search' },
    { label: 'Library', route: PageName.LIBRARY, icon: '@tui.square-library' },
    { label: 'About Us', route: PageName.ABOUT, icon: '@tui.info' },
  ];

  constructor() {
    this.updateMobileState();
    this.handleMediaQueryChange();
    this.closeSidebarOnMobileNavigating();
  }

  protected onToggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected onBackdropClick(): void {
    this.sidebarOpen.set(false);
  }

  private updateMobileState(): void {
    const mediaQuery = globalThis.matchMedia('(max-width: 768px)');
    this.isMobile.set(mediaQuery.matches);
  }

  private handleMediaQueryChange() {
    const mediaQuery = globalThis.matchMedia('(max-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => {
      this.isMobile.set(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', handleChange);
    });
  }

  private closeSidebarOnMobileNavigating() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.sidebarOpen.set(false);
        }
      });
  }
}
