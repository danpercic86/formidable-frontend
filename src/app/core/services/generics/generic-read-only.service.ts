import { Injectable, Injector } from '@angular/core';
import { Model } from '@models/base.model';
import { Observable } from 'rxjs';
import { GenericBaseService } from '@services/generics/generic-base.service';

@Injectable({
    providedIn: 'root',
})
export abstract class GenericReadOnlyService<T extends Model> extends GenericBaseService {
    protected constructor(protected injector: Injector) {
        super(injector);
    }

    private _getOne(slugOrId: string): Observable<T> {
        const url = `${this._url}/${slugOrId}/`;
        return this.http.get<T>(url);
    }

    private _getAll(): Observable<T[]> {
        return this.http.get<T[]>(this._url);
    }

    public get(slugOrId: string): Observable<T | T[]> {
        if (slugOrId !== undefined && slugOrId !== null) {
            return this._getOne(slugOrId);
        }
        return this._getAll();
    }
}
