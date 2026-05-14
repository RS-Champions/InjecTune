import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { TeamMember } from '../models/team-member';
import { LoadedData } from '@shared/models/loaded-data';

@Injectable({
  providedIn: 'root',
})
export class AboutStore {
  private readonly http = inject(HttpClient);
  private readonly jsonUrl = 'team-members.json';
  private readonly _teamMembers = signal<LoadedData<TeamMember[]>>({
    value: null,
    isLoading: false,
    error: null,
  });
  public teamMembers = this._teamMembers.asReadonly();

  public loadTeamMembers() {
    if (this._teamMembers().value) {
      return of(null);
    }

    this._teamMembers.update((oldData) => {
      return { ...oldData, isLoading: true, error: null };
    });

    return this.http.get<TeamMember[]>(this.jsonUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this._teamMembers.update((oldData) => {
          return {
            ...oldData,
            isLoading: false,
            error: {
              code: error.status,
            },
          };
        });
        return of(null);
      }),
      tap((teamMembers) => {
        this._teamMembers.update((oldData) => {
          return {
            ...oldData,
            isLoading: false,
            value: teamMembers,
          };
        });
      }),
    );
  }
}
