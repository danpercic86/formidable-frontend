import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export abstract class GenericBaseService {
    protected abstract readonly _modelName: string;
    protected _apiUrl = '/api/';
    protected _http: HttpClient;

    protected constructor(protected injector: Injector) {
        this._http = injector.get(HttpClient);
    }

    protected get _url(): string {
        return `${this._apiUrl}${this._modelName}/`;
    }
}
