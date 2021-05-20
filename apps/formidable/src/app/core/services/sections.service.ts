import { Injectable, Injector } from '@angular/core';
import { ReadOnlyService } from './generics/read-only.service';
import { ISection } from '@formidable/models';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends ReadOnlyService<ISection>
{
  protected _modelName = 'sections';

  constructor(protected _injector: Injector)
  {
    super(_injector);
  }
}
