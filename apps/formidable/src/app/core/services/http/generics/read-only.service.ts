import { Observable } from 'rxjs';
import { Service } from './base.service';
import { IModel } from '@builder/shared';

export abstract class ReadOnlyService<T extends IModel> extends Service
{
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
