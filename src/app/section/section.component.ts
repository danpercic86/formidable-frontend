import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { SectionsService } from '@services/sections.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SectionModel } from '@models/section.model';
import { FieldModel } from '../form-builder/shared/models';

@Component({
    selector: 'formidable-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
    @ViewChild(FormBuilderComponent) form!: FormBuilderComponent;
    section$: Observable<SectionModel>;
    fields: FieldModel[] = [];

    constructor(private __sectionsService: SectionsService, private __route: ActivatedRoute) {
        const id = this.__route.snapshot.paramMap.get('id') || undefined;
        this.section$ = this.__sectionsService.get(id) as Observable<SectionModel>;
        this.section$.subscribe((section) => {
            this.fields = section.fields;
            console.log(this.fields);
        });
    }

    submit(event: Event): void {
        console.log('form submitted');
        console.log(event);
    }
}
