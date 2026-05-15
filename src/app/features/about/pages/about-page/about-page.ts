import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AboutCard } from '../../components/about-card/about-card';
import { AboutStore } from '../../services/about-store';
import { TuiLink, TuiLoader, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-about-page',
  imports: [AboutCard, TuiLoader, TuiCardLarge, TuiHeader, TuiLink, TuiTitle],
  templateUrl: './about-page.html',
  styleUrl: './about-page.less',
})
export class AboutPage {
  private readonly aboutStore = inject(AboutStore);
  protected readonly teamMembers = this.aboutStore.teamMembers;

  constructor() {
    this.aboutStore.loadTeamMembers().pipe(takeUntilDestroyed()).subscribe();
  }
}
