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

    private __getOne(slugOrId: string): Observable<T> {
        const url = `${this._url}/${slugOrId}/`;
        return this._http.get<T>(url);
    }

    private __getAll(): Observable<T[]> {
        return this._http.get<T[]>(this._url);
    }

    public get(slugOrId?: string): Observable<T | T[]> {
        if (slugOrId !== undefined && slugOrId !== null) {
            return this.__getOne(slugOrId);
        }
        return this.__getAll();
    }
}
