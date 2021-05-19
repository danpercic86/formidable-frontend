import { Injector } from '@angular/core';
import { Model } from '@models/base.model';
import { BaseService } from '@services/generics/base.service';
import { Observable } from 'rxjs';

export abstract class CreateService<T extends Model> extends BaseService
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
