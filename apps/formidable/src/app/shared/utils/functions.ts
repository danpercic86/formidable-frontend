import { EntityCollectionServiceBase } from '@ngrx/data';
import { IModel } from '@builder/shared';
import { MonoTypeOperatorFunction, OperatorFunction, switchMap, tap } from 'rxjs';

type NullableString = string | null | undefined;

export function isNullOrEmpty(value: NullableString): boolean {
  return value === '' || value === null || value === undefined;
}

export function isNotNullOrEmpty(value: NullableString): boolean {
  return !isNullOrEmpty(value);
}

export function error(message?: string): never {
  throw new Error(message || 'Unknown error occurred!');
}

export function getDataByKey<K extends IModel>(
  service: EntityCollectionServiceBase<K>,
): OperatorFunction<string, K> {
  return switchMap((key: string) => service.getByKey(key));
}

export function getAllIfEmpty<T extends IModel>(
  service: EntityCollectionServiceBase<T>,
): MonoTypeOperatorFunction<T[]> {
  return tap<T[]>(({ length }) => {
    if (length === 0) service.getAll();
  });
}
