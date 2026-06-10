import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarComponent } from '@shared/components/sidebar/sidebar';
import { HamburgerComponent } from '@shared/components/hamburger/hamburger';
import { NavItem } from '@shared/components/sidebar/sidebar';
import { ROUTE_PATHS } from '../../../app.routes';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, SidebarComponent, HamburgerComponent],
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
    { label: 'Discover', route: ROUTE_PATHS.DISCOVER, icon: '@tui.music-4' },
    { label: 'Search', route: ROUTE_PATHS.SEARCH, icon: '@tui.search' },
    { label: 'About', route: ROUTE_PATHS.ABOUT, icon: '@tui.info' },
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
