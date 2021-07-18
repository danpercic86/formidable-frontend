import { Component } from '@angular/core';
import { FormsService } from '@formidable/services';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent
{
  forms$ = this._formsService.getAll();

  constructor(private readonly _formsService: FormsService)
  {
  }
}
