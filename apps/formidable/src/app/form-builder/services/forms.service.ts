import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { IForm } from '@builder/shared';

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
