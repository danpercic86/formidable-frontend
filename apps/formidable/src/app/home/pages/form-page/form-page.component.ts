import { Component } from '@angular/core';
import { FormsService } from '@formidable/services';
import { Observable } from 'rxjs';
import { IForm } from '@formidable/models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent
{
  form$ = this._route.paramMap.pipe(switchMap(params => this._getForm(params)));

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

  private _getForm(params: ParamMap): Observable<IForm>
  {
    return this._formsService.getByKey(params.get('id') as string);
  }
}
