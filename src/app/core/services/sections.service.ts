import { Injectable, Injector } from '@angular/core';
import { ReadOnlyService } from '@services/generics/read-only.service';
import { SectionModel } from '@models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends ReadOnlyService<SectionModel>
{
  protected _modelName = 'sections';

  constructor(protected _injector: Injector)
  {
    super(_injector);
  }
}
