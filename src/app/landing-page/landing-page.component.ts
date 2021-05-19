import { Component } from '@angular/core';
import { FormsService } from '@services/forms.service';
import { FormModel } from '@models/form.model';
import { Observable } from 'rxjs';

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
