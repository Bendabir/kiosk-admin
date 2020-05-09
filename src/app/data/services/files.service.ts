import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { APIService } from '@app/services';
import { environment as env } from '@env';

import { File } from '../schemas';

@Injectable()
export class FilesService extends APIService {
  private endpoint = `${this.baseRoute}/files`;
  private filesEndpoint = `http://${env.server.host}:${env.server.port}/${env.server.routes.files}`;

  getAll(notify: boolean = true): Observable<File[]> {
    return this.http.get<File[]>(this.endpoint).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error fetching files : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  uploadOne(file: globalThis.File, notify: boolean = true): Observable<File> {
    if (file.size > env.server.maxFileSize) {
      const message = 'File is too big.';

      if (notify) {
        this.snackBarService.showError(`Error uploading file '${file.name}' : ${message}`);
      }

      return throwError(new Error(message));
    }

    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.http.post(this.filesEndpoint, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error uploading file '${file.name}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  deleteOne(file: File, notify: boolean = true): Observable<boolean> {
    const url = `${this.endpoint}/${file.filename}`;

    return this.http.delete<void>(url).pipe(
      map(_ => {
        if (notify) {
          this.snackBarService.showInfo(`Deleted file '${file.filename}'.`);
        }

        return true;
      }),
      catchError(err => {
        if (notify) {
          const message = this.extractMessage(err);
          this.snackBarService.showError(`Error deleting file '${file.filename}' : ${message}`);
        }

        return throwError(err); // Let subscribers decide what to do with errors
      })
    );
  }

  link(filename: string): string {
    return `${this.filesEndpoint}/${filename}`;
  }
}
