import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export abstract class GenericBaseService {
    protected abstract readonly modelName: string;
    protected apiUrl = '/api/';
    protected http: HttpClient;

    protected constructor(protected injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    protected get _url(): string {
        return `${this.apiUrl}${this.modelName}/`;
    }
}
