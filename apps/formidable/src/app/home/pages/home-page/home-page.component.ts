import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsService } from '@builder/core';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent
{
  readonly forms$ = this._formsService.getAll();

  constructor(private readonly _formsService: FormsService)
  {
  }
}
