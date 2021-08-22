import { IModel } from '@builder/shared';

export interface IResponse {
  readonly field: number;
  readonly value: string;
}

export interface IResponseRequest {
  readonly responses: IResponse[];
}

export interface IResponseGet extends IModel {
  readonly value: string;
  readonly errors: string;
  readonly status: string;
}
