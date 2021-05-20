import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IModel } from '@formidable/models';
import { BaseService } from './base.service';

export abstract class CreateService<T extends IModel> extends BaseService
{
  protected constructor(protected readonly _injector: Injector)
  {
    super(_injector);
  }

  create(payload: T): Observable<T>
  {
    return this._http.post<T>(this._url, payload);
  }
}
