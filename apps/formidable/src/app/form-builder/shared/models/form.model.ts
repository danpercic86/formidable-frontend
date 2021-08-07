import { ICreatedModifiedModel } from './base.model';
import { ISectionMinimal } from './section.model';
import { Set } from 'immutable';

export interface IForm extends ICreatedModifiedModel
{
  readonly name: string;
  readonly description: string;
  readonly sections: Set<ISectionMinimal>;
}
