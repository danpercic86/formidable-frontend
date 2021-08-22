import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseRequest } from '../shared/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(private readonly _http: HttpClient) {}

  post(body: IResponseRequest, sectionId: string): Observable<unknown> {
    const url = `/api/sections/${sectionId}/responses/`;
    return this._http.post(url, body, { withCredentials: true });
  }
}
