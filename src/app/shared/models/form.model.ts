import { ICreatedModifiedModel } from './base.model';
import { ISectionMinimal } from './section.model';

export interface IForm extends ICreatedModifiedModel {
  name: string;
  description: string;
  sections: ISectionMinimal[];
}
