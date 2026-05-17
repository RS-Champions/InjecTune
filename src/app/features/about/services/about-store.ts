import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TeamMember } from '../interfaces/team-member';

@Injectable({ providedIn: 'root' })
export class AboutStore {
  private readonly teamMembersUrl = 'team-members.json';
  public readonly teamMembersResource = httpResource<TeamMember[]>(() => this.teamMembersUrl);
}
