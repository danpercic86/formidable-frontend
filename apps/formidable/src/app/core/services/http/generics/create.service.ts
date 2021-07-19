import { Observable } from 'rxjs';
import { Service } from './base.service';
import { IModel } from '@builder/shared';

export abstract class CreateService<T extends IModel> extends Service
{
  create(payload: T): Observable<T>
  {
    return this._http.post<T>(this._url, payload);
  }
}
