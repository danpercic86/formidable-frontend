import { ICreatedModifiedModel, IForm } from '@builder/shared';
import { IResponse, IResponseGet } from './response.model';
import { Set } from 'immutable';

export interface IApplicationRequest
{
  readonly form: number;
  readonly responses: Set<IResponse>;
}

export interface IApplication extends ICreatedModifiedModel
{
  readonly form: IForm;
  readonly responses: Set<IResponseGet>;
}
