import { Component } from '@angular/core';
import { FormsService } from '@services/forms.service';
import { FormModel } from '@models/form.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'formidable-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
    public forms$: Observable<FormModel[]>;

    constructor(private formsService: FormsService) {
        this.forms$ = formsService.get() as Observable<FormModel[]>;
    }
}
