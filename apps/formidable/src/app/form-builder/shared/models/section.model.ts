import { IModel } from './base.model';
import { IField } from '@builder/shared';
import { Set } from 'immutable';

export interface ISectionMinimal extends IModel
{
  readonly name: string;
}

export interface ISection extends ISectionMinimal
{
  readonly fields: Set<IField>;
  readonly description: string;
  readonly buttonText: string;
}
