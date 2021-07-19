import {
  DefaultDataServiceConfig,
  EntityDataModuleConfig,
  EntityMetadataMap
} from '@ngrx/data';
import { environment } from '@formidable/env';

const entityMetadata: EntityMetadataMap = {
  forms: {},
  sections: {}
};

const pluralNames = { forms: 'forms', sections: 'sections' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
};
