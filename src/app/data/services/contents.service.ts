import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Content, ContentType } from '../schemas';

@Injectable()
export class ContentsService extends APIService {
  private endpoint = `${this.baseRoute}/contents`;

  static groupContentsByType(contents: Content[]): Map<ContentType, Content[]> {
    const groups = new Map<ContentType, Content[]>(Content.ACTIVATED_TYPES.map((type: ContentType) => {
      return [type, []];
    }));

    contents.forEach(c => groups.get(c.type).push(c));

    return groups;
  }

  getAll(notify: boolean = true): Observable<Content[]> {
    return this.http.get<Content[]>(this.endpoint).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error fetching contents : ${message}`);
        }

        return throwError(err);
      })
    );
  }

  getAllByType(type: ContentType, notify: boolean = true): Observable<Content[]> {
    if (!type) {
      return this.getAll(notify);
    }

    const url = `${this.endpoint}?type=${type}`;

    return this.http.get<Content[]>(url).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error fetching contents : ${message}`);
        }

        return throwError(err);
      })
    );
  }

  addOne(content: Content, notify: boolean = true): Observable<Content> {
    return this.http.post<Content>(this.endpoint, content).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`Created content '${content.displayName}'.`);
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error creating content : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  updateOne(content: Content, notify: boolean = true): Observable<Content> {
    const url = `${this.endpoint}/${content.id}`;

    return this.http.patch<Content>(url, content).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo(`Edited content '${content.displayName}'.`);
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error editing content '${content.displayName}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  deleteOne(content: Content, notify: boolean = true): Observable<boolean> {
    const url = `${this.endpoint}/${content.id}`;

    return this.http.delete<void>(url).pipe(
      map(_ => {
        if (notify) {
          this.snackBarService.showInfo(`Deleted content '${content.displayName}'.`);
        }

        return true;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error deleting content '${content.displayName}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  analyseURI(uri: string, notify: boolean = true): Observable<Content> {
    const url = `${this.endpoint}/analysis`;

    return this.http.get<Content>(url, {
      params: {
        uri
      }
    }).pipe(
      map((response: any) => {
        if (notify) {
          this.snackBarService.showInfo('Analysed URI.');
        }

        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error analysis URI '${uri}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }
}
