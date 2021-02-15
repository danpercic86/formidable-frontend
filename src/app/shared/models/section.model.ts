import { Model } from '@models/base.model';
import { FieldModel } from '../../form-builder/shared/models';

export interface SectionMinimalModel extends Model {
    name: string;
}

export interface SectionModel extends SectionMinimalModel {
    fields: FieldModel[];
    description: string;
    button_text: string;
}
