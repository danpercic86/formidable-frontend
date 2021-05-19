import { Injector } from '@angular/core';
import { Model } from '@models/base.model';
import { Observable } from 'rxjs';
import { BaseService } from '@services/generics/base.service';

export abstract class ReadOnlyService<T extends Model> extends BaseService
{
  protected constructor(protected readonly _injector: Injector)
  {
    super(_injector);
  }

  get(): Observable<T[]>;
  get(slugOrId: string): Observable<T>;
  get(slugOrId?: string): Observable<T | T[]>
  {
    return slugOrId ? this._getOne(slugOrId) : this._getAll();
  }

  private _getOne(slugOrId: string): Observable<T>
  {
    return this._http.get<T>(`${this._url}${slugOrId}/`);
  }

  private _getAll(): Observable<T[]>
  {
    return this._http.get<T[]>(this._url);
  }
}
