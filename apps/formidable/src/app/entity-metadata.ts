import { DefaultDataServiceConfig, EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { environment } from '@formidable/env';

const entityMetadata: Readonly<EntityMetadataMap> = {
  forms: {},
  sections: {},
} as const;

const plural = { forms: 'forms', sections: 'sections' } as const;

export const entityConfig: Readonly<EntityDataModuleConfig> = {
  entityMetadata,
  pluralNames: plural,
} as const;

export const defaultDataServiceConfig: Readonly<DefaultDataServiceConfig> = {
  root: environment.apiUrl,
} as const;
