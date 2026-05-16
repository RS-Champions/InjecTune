import { Injectable, ResourceRef, inject, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TeamMember } from '../models/team-member';

@Injectable({ providedIn: 'root' })
export class AboutStore {
  private readonly http = inject(HttpClient);
  private readonly jsonUrl = 'team-members.json';
  private teamMembersResource?: ResourceRef<TeamMember[] | undefined>;

  public loadTeamMembers() {
    return (this.teamMembersResource ??= resource({
      params: () => ({}),
      loader: ({ params }) => {
        //doesn't work without params, but not used it => lint error
        console.log(params);
        return firstValueFrom(this.http.get<TeamMember[]>(this.jsonUrl));
      },
    }));
  }
}
