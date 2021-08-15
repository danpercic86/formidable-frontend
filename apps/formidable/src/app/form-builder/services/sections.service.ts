import { Injectable } from '@angular/core';
import { ISection } from '@builder/shared';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { FormidableCollectionService } from './formidable-collection-service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends FormidableCollectionService<ISection> {
  constructor(protected readonly _serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('sections', _serviceElementsFactory);
  }
}
