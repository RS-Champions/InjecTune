import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiAppearance, TuiLink, TuiCell } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader, TuiSurface } from '@taiga-ui/layout';
import { TeamMember } from '../../models/team-member';

@Component({
  selector: 'app-about-card',
  imports: [TuiAppearance, TuiCell, TuiSkeleton, TuiCardLarge, TuiLink, TuiHeader, TuiSurface, TuiCell],
  templateUrl: './about-card.html',
  styleUrl: './about-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutCard {
  public readonly teamMember = input.required<TeamMember>();
  protected isSkeletonVisible = true;

  protected hideSkeleton() {
    this.isSkeletonVisible = false;
  }
}
