import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { PoPageDynamicEditActions } from './interfaces/po-page-dynamic-edit-actions.interface';
import { PoPageDynamicEditBeforeCancel } from './interfaces/po-page-dynamic-edit-before-cancel.interface';
import { PoPageDynamicEditBeforeSave } from './interfaces/po-page-dynamic-edit-before-save.interface';

@Injectable({
  providedIn: 'root'
})
export class PoPageDynamicEditActionsService {
  readonly headers: HttpHeaders = new HttpHeaders({
    'X-PO-SCREEN-LOCK': 'true'
  });

  constructor(private http: HttpClient) {}

  beforeCancel(path: PoPageDynamicEditActions['beforeCancel']): Observable<PoPageDynamicEditBeforeCancel> {
    if (!path) {
      return of({});
    }

    if (typeof path === 'string') {
      return this.http.post(path, {}, { headers: this.headers });
    }

    return of(path());
  }

  beforeSave(path: PoPageDynamicEditActions['beforeSave'], resource: any): Observable<PoPageDynamicEditBeforeSave> {
    const resourceToPost = resource ?? {};

    if (!path) {
      return of({});
    }

    if (typeof path === 'string') {
      return this.http.post(path, resourceToPost, { headers: this.headers });
    }

    return of(path(resourceToPost));
  }
}
