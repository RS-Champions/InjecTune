import { ChangeDetectionStrategy, Component, inject, ResourceRef } from '@angular/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiLink, TuiLoader, TuiTitle } from '@taiga-ui/core';
import { AboutCard } from '../../components/about-card/about-card';
import { AboutStore } from '../../services/about-store';
import { TeamMember } from '@features/about/models/team-member';

@Component({
  selector: 'app-about-page',
  imports: [AboutCard, TuiLoader, TuiCardLarge, TuiLink, TuiTitle],
  templateUrl: './about-page.html',
  styleUrl: './about-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  private readonly aboutStore = inject(AboutStore);
  protected teamMembers: ResourceRef<TeamMember[] | undefined>;

  constructor() {
    this.teamMembers = this.aboutStore.loadTeamMembers();
  }
}
