import { FieldType, IChoice, IModel, IValidator } from '@builder/shared';

export interface IField extends IModel
{
  name: string;
  value: string;
  is_required: boolean;
  placeholder: string;
  dependent_value: string;
  dependent_field?: number;
  choices: IChoice[];
  validators: IValidator[];
  type: FieldType;
}
