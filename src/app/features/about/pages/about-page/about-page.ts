import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiIcon, TuiLink, TuiLoader, TuiTitle } from '@taiga-ui/core';
import { AboutCard } from '@features/about/components/about-card/about-card';
import { AboutStore } from '@features/about/services/about-store';

@Component({
  selector: 'app-about-page',
  imports: [AboutCard, TuiLoader, TuiCardLarge, TuiLink, TuiTitle, TuiIcon],
  templateUrl: './about-page.html',
  styleUrl: './about-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  private readonly aboutStore = inject(AboutStore);
  private readonly enteredAt = Date.now();

  protected readonly teamMembersResource = this.aboutStore.teamMembersResource;

  get secondsLeft(): number {
    return Math.max(0, Math.ceil((10_000 - (Date.now() - this.enteredAt)) / 1000));
  }

  get isLocked(): boolean {
    return this.secondsLeft > 0;
  }
}
