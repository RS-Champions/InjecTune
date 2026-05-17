import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { TeamMember } from '../interfaces/team-member';

@Injectable({ providedIn: 'root' })
export class AboutStore {
  private readonly teamMembersUrl = 'team-members.json';
  public readonly teamMembersResource: HttpResourceRef<TeamMember[] | undefined> = httpResource(() => this.teamMembersUrl);
}
