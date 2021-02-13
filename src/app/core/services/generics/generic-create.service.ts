import { Injectable, Injector } from '@angular/core';
import { Model } from '@models/base.model';
import { GenericBaseService } from '@services/generics/generic-base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export abstract class GenericCreateService<T extends Model> extends GenericBaseService {
    protected constructor(protected injector: Injector) {
        super(injector);
    }

    public post(payload: T): Observable<T> {
        return this.http.post<T>(this._url, payload);
    }
}
