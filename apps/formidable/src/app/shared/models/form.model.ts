import { ICreatedModifiedModel } from './base.model';
import { ISectionMinimal } from './section.model';

export interface IForm extends ICreatedModifiedModel
{
  readonly name: string;
  readonly description: string;
  readonly sections: ISectionMinimal[];
}
