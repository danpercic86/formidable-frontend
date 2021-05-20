import { Observable } from 'rxjs';
import { IForm } from '../models';

export interface IFormService {
  get(): Observable<IForm[]>;
  get(slugOrId: string): Observable<IForm>;
}
