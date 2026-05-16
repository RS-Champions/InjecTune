import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiLink, TuiLoader, TuiTitle } from '@taiga-ui/core';
import { AboutCard } from '../../components/about-card/about-card';
import { AboutStore } from '../../services/about-store';

@Component({
  selector: 'app-about-page',
  imports: [AboutCard, TuiLoader, TuiCardLarge, TuiLink, TuiTitle],
  templateUrl: './about-page.html',
  styleUrl: './about-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  private readonly aboutStore = inject(AboutStore);
  protected readonly teamMembersResource = this.aboutStore.teamMembersResource;
}
