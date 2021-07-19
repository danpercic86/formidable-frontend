import { Injectable } from '@angular/core';
import { ISection } from '@builder/shared';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class SectionsService extends EntityCollectionServiceBase<ISection>
{
  constructor(
    private readonly _serviceElementsFactory: EntityCollectionServiceElementsFactory
  )
  {
    super('sections', _serviceElementsFactory);
  }
}
