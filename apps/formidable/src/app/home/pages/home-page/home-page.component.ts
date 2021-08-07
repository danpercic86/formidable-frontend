import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsService } from '@builder/core';
import { map } from 'rxjs/operators';
import { Set } from 'immutable';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent
{
  readonly forms$ = this._formsService.getAll().pipe(map(forms => Set(forms)));

  constructor(private readonly _formsService: FormsService)
  {
  }
}
