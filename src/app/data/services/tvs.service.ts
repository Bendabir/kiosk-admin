import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Action, ActionType, TV } from '../schemas';

@Injectable()
export class TVsService extends APIService {
  private endpoint = `${this.baseRoute}/tvs`;

  getAll(resolve: boolean = false): Observable<TV[]> {
    const url = `${this.endpoint}?resolve=${resolve}`;

    return this.http.get<TV[]>(url).pipe(
      map((response: any) => response.data)
    );
  }

  updateOne(tv: TV, resolve: boolean = false): Observable<TV> {
    const url = `${this.endpoint}/${tv.id}?resolve=${resolve}`;

    return this.http.patch<TV>(url, tv).pipe(
      map((response: any) => response.data)
    );
  }

  deleteOne(tv: string | TV): Observable<void> {
    const id = (typeof tv === 'string') ? tv : tv.id;
    const url = `${this.endpoint}/${id}`;

    return this.http.delete<void>(url);
  }

  triggerAction(tv: TV, action: ActionType): Observable<Action> {
    const url = `${this.endpoint}/${tv.id}/actions`;
    const parameters = Action.parameters(action, this.settingsService.getSettings());

    return this.http.post<Action>(url, {
      action,
      parameters
    }).pipe(
      map((response: any) => response.data)
    );
  }
}
