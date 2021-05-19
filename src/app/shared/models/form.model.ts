import { CreatedModifiedModel } from './base.model';
import { SectionMinimalModel } from './section.model';

export interface FormModel extends CreatedModifiedModel {
  name: string;
  description: string;
  sections: SectionMinimalModel[];
}
