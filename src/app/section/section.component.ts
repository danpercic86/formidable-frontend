import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
    selector: 'formidable-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
    @ViewChild(FormBuilderComponent) form: FormBuilderComponent;

    constructor() {}

    submit(event: Event): void {
        console.log('form submitted');
        console.log(event);
    }
}
