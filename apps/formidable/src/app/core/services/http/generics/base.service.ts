import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class Service {
  protected abstract readonly _modelName: string;

  protected _apiUrl = '/api/';

  protected constructor(protected readonly _http: HttpClient) {}

  protected get _url(): string {
    return `${this._apiUrl}${this._modelName}/`;
  }
}
