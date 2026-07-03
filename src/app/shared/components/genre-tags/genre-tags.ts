import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagName } from '@shared/constants/tag-name';

@Component({
  selector: 'app-genre-tags',
  imports: [RouterLink],
  templateUrl: './genre-tags.html',
  styleUrl: './genre-tags.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreTags {
  // TODO: replace genres for real when search page will be implemented
  protected readonly genres: string[] = Object.values(TagName);

  protected getQueryParams(genre: string) {
    return { fuzzytags: genre.toLowerCase() };
  }
}
