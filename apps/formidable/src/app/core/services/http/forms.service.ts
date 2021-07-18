import { Injectable } from '@angular/core';
import { IForm } from '@formidable/models';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class FormsService extends EntityCollectionServiceBase<IForm>
{
  constructor(
    private readonly _serviceElementsFactory: EntityCollectionServiceElementsFactory
  )
  {
    super('forms', _serviceElementsFactory);
  }
}
