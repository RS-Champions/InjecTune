import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  imports: [],
  templateUrl: './hamburger.html',
  styleUrl: './hamburger.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerComponent {
  toggleSidebar = output();

  onToggle(): void {
    this.toggleSidebar.emit();
  }
}
