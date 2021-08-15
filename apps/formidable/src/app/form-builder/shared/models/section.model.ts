import { IField } from '@builder/shared';
import { Set } from 'immutable';
import { IModel } from './base.model';

export interface ISectionMinimal extends IModel {
  readonly name: string;
}

export interface ISection extends ISectionMinimal {
  readonly fields: Set<IField>;
  readonly description: string;
  readonly buttonText: string;
}
