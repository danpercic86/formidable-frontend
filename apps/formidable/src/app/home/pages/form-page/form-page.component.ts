import { Component } from '@angular/core';
import { FormsService } from '@formidable/services';
import { Observable } from 'rxjs';
import { IForm } from '@formidable/models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent
{
  form$: Observable<IForm>;

  constructor(
    private readonly _formsService: FormsService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  )
  {
    this.form$ = _route.paramMap.pipe(switchMap(params => this._getForm(params)));
  }

  async goToFirstSection(sectionId: string): Promise<void>
  {
    await this._router.navigate(['home', 'sections', sectionId]);
  }

  private _getForm(params: ParamMap): Observable<IForm>
  {
    return this._formsService.get(params.get('id') as string);
  }
}
