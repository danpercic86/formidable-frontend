import {
  DefaultDataServiceConfig,
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { environment } from '@formidable/env';

const entityMetadata: Readonly<EntityMetadataMap> = {
  forms: {},
  sections: {},
} as const;

const pluralNames = { forms: 'forms', sections: 'sections' } as const;

export const entityConfig: Readonly<EntityDataModuleConfig> = {
  entityMetadata,
  pluralNames,
} as const;

export const defaultDataServiceConfig: Readonly<DefaultDataServiceConfig> = {
  root: environment.apiUrl,
} as const;
