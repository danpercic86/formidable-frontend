import { Injectable, Injector } from '@angular/core';
import { ReadOnlyService } from './generics/read-only.service';
import { IForm } from '@formidable/models';
import { IFormService } from '@formidable/shared';

@Injectable({
  providedIn: 'root'
})
export class FormsService
  extends ReadOnlyService<IForm>
  implements IFormService
{
  protected _modelName = 'forms';

  constructor(protected _injector: Injector)
  {
    super(_injector);
  }
}
