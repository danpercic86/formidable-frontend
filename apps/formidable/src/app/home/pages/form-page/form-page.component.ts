import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsService } from '@builder/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IForm } from '@builder/shared';
import { BtnColors, getDataByKey } from '@formidable/shared';
import { LinkTextColors } from '../../../form-builder/shared/components/link/link-text-color.type';

@Component({
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {
  readonly form$ = this._form$;
  readonly textColors = LinkTextColors;
  readonly btnColors = BtnColors;

  constructor(
    private readonly _formsService: FormsService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) {}

  private get _form$(): Observable<IForm> {
    const goHome = () => this._router.navigate(['home']).then();
    return this._route.paramMap.pipe(
      tap(params => params.has('id') ?? goHome()),
      map(params => params.get('id') as string),
      getDataByKey(this._formsService),
    );
  }
}
