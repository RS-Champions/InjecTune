import { Component, input, ChangeDetectionStrategy, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutePath } from '../../../app.routes';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

export interface NavItem {
  label: string;
  route: RoutePath;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly sidebarOpen = input<boolean>(true);
  public readonly isMobile = input<boolean>(false);
  public readonly navigationItems = input.required<NavItem[]>();

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected isActiveRoute(route: string): boolean {
    return this.url().includes(route);
  }
}
