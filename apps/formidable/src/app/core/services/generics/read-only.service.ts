import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IModel } from '@formidable/models';
import { BaseService } from './base.service';

export abstract class ReadOnlyService<T extends IModel> extends BaseService
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
