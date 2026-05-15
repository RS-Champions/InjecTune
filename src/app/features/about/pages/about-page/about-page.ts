import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AboutCard } from '../../components/about-card/about-card';
import { AboutStore } from '../../services/about-store';
import { TuiLoader } from '@taiga-ui/core';

@Component({
  selector: 'app-about-page',
  imports: [AboutCard, TuiLoader],
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
