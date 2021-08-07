import { IModel } from './base.model';
import { ValidatorType } from '../types/validator.type';

export interface IValidator extends IModel
{
  readonly message: string;
  readonly constraint: string;
  readonly inverse_match: boolean;
  readonly flags: string;
  readonly type: ValidatorType;
}
