import { FieldModel } from '../../form-builder/shared/models';
import { Model } from './base.model';

export interface SectionMinimalModel extends Model {
  name: string;
}

export interface SectionModel extends SectionMinimalModel {
  fields: FieldModel[];
  description: string;
  button_text: string;
}
