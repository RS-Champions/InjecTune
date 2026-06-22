import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-tags',
  imports: [RouterLink],
  templateUrl: './genre-tags.html',
  styleUrl: './genre-tags.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreTags {
  // TODO: replace genres for real when search page will be implemented
  protected readonly genres = [
    'Rock',
    'Electronic',
    'Jazz',
    'Pop',
    'Hip-Hop',
    'Classical',
    'Blues',
    'Country',
    'R&B',
    'Soul',
  ];

  protected getQueryParams(genre: string) {
    return { fuzzytags: genre.toLowerCase() };
  }
}
