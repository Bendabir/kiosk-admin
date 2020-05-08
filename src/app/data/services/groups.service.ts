import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Group } from '../schemas';

@Injectable()
export class GroupsService extends APIService {
  private endpoint = `${this.baseRoute}/groups`;

  getAll(notify: boolean = true): Observable<Group[]> {
    return this.http.get<Group[]>(this.endpoint).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error fetching groups : ${message}`);
        }

        return throwError(err);
      })
    );
  }
}
