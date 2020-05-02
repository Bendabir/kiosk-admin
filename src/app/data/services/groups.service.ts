import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Group } from '../schemas';

@Injectable()
export class GroupsService extends APIService {
  private endpoint = `${this.baseRoute}/groups`;

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.endpoint).pipe(
      map((response: any) => response.data)
    );
  }
}
