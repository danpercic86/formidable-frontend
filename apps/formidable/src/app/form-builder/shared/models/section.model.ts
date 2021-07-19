import { IModel } from './base.model';
import { IField } from '@builder/shared';

export interface ISectionMinimal extends IModel
{
  readonly name: string;
}

export interface ISection extends ISectionMinimal
{
  readonly fields: IField[];
  readonly description: string;
  readonly buttonText: string;
}
