import { Observable } from 'rxjs';
import { FormModel } from '@models/form.model';

export interface IFormService {
    get(slugOrId?: string): Observable<FormModel | FormModel[]>;
}
