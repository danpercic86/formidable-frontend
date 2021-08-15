import { Observable } from 'rxjs';
import { IModel } from '@builder/shared';
import { Service } from './base.service';

export abstract class CreateService<T extends IModel> extends Service {
  create(payload: T): Observable<T> {
    return this._http.post<T>(this._url, payload);
  }
}
