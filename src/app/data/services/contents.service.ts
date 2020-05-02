import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { APIService } from '@app/services';

import { Content, ContentType } from '../schemas';

@Injectable()
export class ContentsService extends APIService {
  private endpoint = `${this.baseRoute}/contents`;

  static groupContentsByType(contents: Content[]): Map<ContentType, Content[]> {
    const groups = new Map<ContentType, Content[]>(Object.values(ContentType).map((type: ContentType) => {
      return [type, []];
    }));

    contents.forEach(c => groups.get(c.type).push(c));

    return groups;
  }

  getAll(): Observable<Content[]> {
    return this.http.get<Content[]>(this.endpoint).pipe(
      map((response: any) => response.data)
    );
  }
}
