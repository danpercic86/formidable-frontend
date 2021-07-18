import {
  DefaultDataServiceConfig,
  EntityDataModuleConfig,
  EntityMetadataMap
} from '@ngrx/data';
import { environment } from '@formidable/env';

const entityMetadata: EntityMetadataMap = {
  forms: {},
  section: {}
};

const pluralNames = { forms: 'forms' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
};
