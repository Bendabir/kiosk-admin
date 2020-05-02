import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { APIService } from '@app/services';

import { TV } from '../schemas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TVsService extends APIService {
  private endpoint = `${this.baseRoute}/tvs`;

  getAll(): Observable<TV[]> {
    return this.http.get<TV[]>(`${this.endpoint}?resolve=true`).pipe(
      map((response: any) => response.data)
    );
  }
}
