import {
  EntityActionOptions,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { distinctUntilChanged, filter, map, Observable, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

interface FormidableEntityActionOptions extends EntityActionOptions {
  readonly fetch?: boolean;
}

export abstract class FormidableCollectionService<T> extends EntityCollectionServiceBase<T> {
  protected constructor(
    readonly entityName: string,
    protected readonly _serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super(entityName, _serviceElementsFactory);
  }

  getAll(options?: FormidableEntityActionOptions): Observable<T[]> {
    return this.loaded$.pipe(
      tap(loaded => {
        if (!loaded || options?.fetch) super.getAll(options);
      }),
      filter(loaded => loaded),
      switchMap(() => this.entities$),
    );
  }

  getByKey(key: string, options?: FormidableEntityActionOptions): Observable<T> {
    if (options?.fetch) return super.getByKey(key, options);
    return this.collection$.pipe(
      map(collection => collection.entities[key]),
      distinctUntilChanged(),
      switchMap(form => (form ? of(form) : super.getByKey(key, options))),
    );
  }
}
