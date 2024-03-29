import { FieldType, IChoice, IModel, IValidator } from '@builder/shared';
import { Set } from 'immutable';
import { IResponseGet } from './response.model';

export interface IField extends IModel {
  readonly name: string;
  readonly is_required: boolean;
  readonly placeholder: string;
  readonly dependent_value: string;
  readonly dependent_field?: number;
  readonly choices: Set<IChoice>;
  readonly validators: Set<IValidator>;
  readonly type: FieldType;
  readonly response?: IResponseGet;
}
