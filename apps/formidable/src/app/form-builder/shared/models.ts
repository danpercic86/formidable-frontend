import { IModel } from '@formidable/models';

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

export interface IChoice
{
  name: string;
  value: string;
}

export interface IValidator extends IModel
{
  message: string;
  constraint: string;
  inverse_match: boolean;
  flags: string;
  type: ValidatorType;
}

export const ValidatorTypes =
  {
    min: 'min',
    max: 'max',
    minlength: 'minlength',
    maxlength: 'maxlength',
    pattern: 'pattern',
    email: 'email',
    required: 'required'
  } as const;

export type ValidatorType = keyof typeof ValidatorTypes

export const FieldTypes =
  {
    text: 'text',
    email: 'email',
    url: 'url',
    integer: 'integer',
    decimal: 'decimal'
    // file = 'file',
    // checkbox = 'checkbox',
    // radio = 'radio',
    // select = 'select',
  } as const;

export type FieldType = keyof typeof FieldTypes
