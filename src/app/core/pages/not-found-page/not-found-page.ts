import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, TuiButton],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
