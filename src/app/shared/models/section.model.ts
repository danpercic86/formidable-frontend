import { Model } from '@models/base.model';

export interface SectionMinimalModel extends Model {
    name: string;
}

export interface SectionModel extends SectionMinimalModel {
    name: string;
}
