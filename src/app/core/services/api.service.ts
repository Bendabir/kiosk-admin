import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { environment as env } from '@env';

import { SettingsService } from './settings.service';
import { SnackBarService } from './snack-bar.service';

/** Define a base service to be extended for the API.
 */
@Injectable()
export class APIService {
  protected baseRoute = `http://${env.server.host}:${env.server.port}/${env.server.routes.api}`;

  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }

  constructor(
    protected http: HttpClient,
    protected settingsService: SettingsService,
    protected snackBarService: SnackBarService
  ) { }

  public extractMessage(err: any) {
    if (err instanceof ErrorEvent) {
      return err.error.message;
    } else if (err.status === 0) {
      return 'Server appears to be unreachable. Please check your connection.';
    } else if (err instanceof HttpErrorResponse && 'error' in err.error) {
      return err.error.error.message;
    } else {
      return err.message;
    }
  }

  protected handleError(err: any) {
    const message = this.extractMessage(err);

    // TODO : Handle with snacks or whatever
    console.error(message);

    return throwError(message);
  }
}
