import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from '@formidable/models';
import { FormsService } from '@formidable/services';

@Component({
  selector: 'formidable-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent
{
  forms$: Observable<FormModel[]>;

  constructor(private readonly _formsService: FormsService)
  {
    this.forms$ = _formsService.get();
  }
}
