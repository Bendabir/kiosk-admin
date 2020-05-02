import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { APIService } from '@app/services';

import { TV } from '../schemas';

@Injectable()
export class TVsService extends APIService {
  private endpoint = `${this.baseRoute}/tvs`;

  getAll(): Observable<TV[]> {
    return this.http.get<TV[]>(`${this.endpoint}?resolve=true`).pipe(
      map((response: any) => response.data)
    );
  }
}
