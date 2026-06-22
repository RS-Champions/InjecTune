import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutePath } from '../../../app.routes';
import { TuiLink } from '@taiga-ui/core';

export interface NavItem {
  label: string;
  route: RoutePath;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, TuiLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly navigationItems = input.required<NavItem[]>();
}
