import { IModel } from './base.model';
import { IField } from '@builder/shared';

export interface ISectionMinimal extends IModel {
  name: string;
}

export interface ISection extends ISectionMinimal {
  fields: IField[];
  description: string;
  button_text: string;
}
