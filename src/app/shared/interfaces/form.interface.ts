import { Observable } from 'rxjs';
import { FormModel } from '../models';

export interface IFormService {
  get(slugOrId?: string): Observable<FormModel | FormModel[]>;
}
