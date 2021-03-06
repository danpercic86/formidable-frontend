import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { SectionsService } from '@services/sections.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SectionModel } from '@models/section.model';
import { FieldModel } from '../form-builder/shared/models';
import { take } from 'rxjs/operators';

@Component({
    selector: 'formidable-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
    @ViewChild(FormBuilderComponent) form: FormBuilderComponent;
    section$: Observable<SectionModel>;
    fields: FieldModel[] = [];

    constructor(private _sectionsService: SectionsService, private _route: ActivatedRoute) {
        const id = this._route.snapshot.paramMap.get('id') || undefined;
        this.section$ = this._sectionsService.get(id) as Observable<SectionModel>;
        this.section$.pipe(take(1)).subscribe((section) => {
            this.fields = section.fields;
            console.log(this.fields);
        });
    }

    submit(data: Record<string, unknown>): void {
        console.log('form submitted');
        console.log(data);
    }
}
