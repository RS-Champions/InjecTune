import { Injectable, inject, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TeamMember } from '../interfaces/team-member';

@Injectable({ providedIn: 'root' })
export class AboutStore {
  private readonly http = inject(HttpClient);
  private readonly jsonUrl = 'team-members.json';
  public readonly teamMembersResource = resource({
    params: () => ({}),
    loader: () => {
      return firstValueFrom(this.http.get<TeamMember[]>(this.jsonUrl));
    },
  });
}
