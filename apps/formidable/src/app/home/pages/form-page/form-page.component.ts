import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsService } from '@builder/core';
import { filter, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IForm } from '@builder/shared';
import { error } from '@formidable/shared';

@Component({
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent
{
  readonly form$ = this._form$;

  constructor(
    private readonly _formsService: FormsService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  )
  {
  }

  async goToSections(formId: string): Promise<void>
  {
    await this._router.navigate(['home', 'forms', formId, 'sections']);
  }

  private get _form$(): Observable<IForm>
  {
    return this._route.paramMap.pipe(
      map(params => params.get('id') ?? error('Id null!')),
      catchError(() => this._router.navigate(['home'])),
      filter(v => !!v),
      switchMap(id => this._formsService.getByKey(id))
    );
  }
}
