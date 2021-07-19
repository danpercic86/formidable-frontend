import { IModel } from './base.model';
import { ValidatorType } from '../types/validator.type';

export interface IValidator extends IModel
{
  message: string;
  constraint: string;
  inverse_match: boolean;
  flags: string;
  type: ValidatorType;
}
