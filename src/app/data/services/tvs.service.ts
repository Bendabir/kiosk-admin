import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Action, ActionType, TV } from '../schemas';

@Injectable()
export class TVsService extends APIService {
  private endpoint = `${this.baseRoute}/tvs`;

  getAll(resolve: boolean = false, notify: boolean = true): Observable<TV[]> {
    const url = `${this.endpoint}?resolve=${resolve}`;

    return this.http.get<TV[]>(url).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error fetching screens : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  addOne(tv: TV, resolve: boolean = false, notify: boolean = true): Observable<TV> {
    const url = `${this.endpoint}?resolve=${resolve}`;

    return this.http.post<TV>(url, tv).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`Created screen '${tv.displayName}'.`);
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error creating screen : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  updateOne(tv: TV, resolve: boolean = false, notify: boolean = true): Observable<TV> {
    const url = `${this.endpoint}/${tv.id}?resolve=${resolve}`;

    return this.http.patch<TV>(url, tv).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`Edited screen '${tv.displayName}'.`)
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error editing screen '${tv.displayName}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  deleteOne(tv: TV, notify: boolean = true): Observable<boolean> {
    const url = `${this.endpoint}/${tv.id}`;

    return this.http.delete<void>(url).pipe(
      map(_ => {
        if (notify) {
          this.snackBarService.showInfo(`Deleted screen '${tv.displayName}'.`);
        }

        return true;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error deleting screen '${tv.displayName}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  triggerAction(tv: TV, action: ActionType, notify: boolean = true): Observable<Action> {
    const url = `${this.endpoint}/${tv.id}/actions`;
    const parameters = Action.parameters(action, this.settingsService.settings);
    const verb = Action.verb(action);

    return this.http.post<Action>(url, {
      action,
      parameters
    }).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`${APIService.capitalize(verb)} screen '${tv.displayName}'.`);
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error ${verb} screen '${tv.displayName}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  triggerActionAll(action: ActionType, notify: boolean = true): Observable<Action> {
    const url = `${this.endpoint}/actions`;
    const parameters = Action.parameters(action, this.settingsService.settings);
    const verb = Action.verb(action);

    return this.http.post<Action>(url, {
      action,
      parameters
    }).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`${APIService.capitalize(verb)} all screens.`);
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error ${verb} all screens : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }
}
