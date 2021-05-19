import { CreatedModifiedModel } from '@models/base.model';
import { SectionMinimalModel } from '@models/section.model';

export interface FormModel extends CreatedModifiedModel {
  name: string;
  description: string;
  sections: SectionMinimalModel[];
}
