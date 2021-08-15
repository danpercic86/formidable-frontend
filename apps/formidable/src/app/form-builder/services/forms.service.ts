import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IForm } from '@builder/shared';
import { FormidableCollectionService } from './formidable-collection-service';

@Injectable({
  providedIn: 'root',
})
export class FormsService extends FormidableCollectionService<IForm> {
  constructor(protected readonly _serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('forms', _serviceElementsFactory);
  }
}
