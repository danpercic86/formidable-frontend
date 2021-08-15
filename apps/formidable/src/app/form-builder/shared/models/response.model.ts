import { IModel } from '@builder/shared';

export interface IResponse {
  readonly field: number;
  readonly value: string;
}

export interface IResponseRequest {
  readonly responses: IResponse[];
}

export interface IResponseGet extends IModel, IResponse {
  readonly errors: string;
}
