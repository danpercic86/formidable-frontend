import { IModel } from '@formidable/models';

export interface IField extends IModel {
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

export interface IChoice {
  name: string;
  value: string;
}

export interface IValidator extends IModel {
  message: string;
  constraint: string;
  inverse_match: boolean;
  flags: string;
  type: ValidatorType;
}

export type ValidatorType =
  | 'min'
  | 'max'
  | 'minlength'
  | 'maxlength'
  | 'pattern'
  | 'required'
  | 'email';

export enum ValidatorTypes {
  min = 'min',
  max = 'max',
  minLength = 'minlength',
  maxLength = 'maxlength',
  regex = 'pattern',
  email = 'email',
  required = 'required',
}

export type FieldType =
  | 'text'
  | 'email'
  | 'url'
  | 'integer'
  | 'decimal'
  | 'file'
  | 'checkbox'
  | 'radio'
  | 'select';

export enum FieldTypes {
  text = 'text',
  email = 'email',
  url = 'url',
  integer = 'integer',
  decimal = 'decimal',
  // file = 'file',
  // checkbox = 'checkbox',
  // radio = 'radio',
  // select = 'select',
}
