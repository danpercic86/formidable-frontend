import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IForm } from '@formidable/models';
import { FormsService } from '@formidable/services';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent
{
  forms$: Observable<IForm[]>;

  constructor(private readonly _formsService: FormsService)
  {
    this.forms$ = _formsService.get();
  }
}
