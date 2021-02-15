import { Injectable, Injector } from '@angular/core';
import { GenericReadOnlyService } from '@services/generics/generic-read-only.service';
import { SectionModel } from '@models/section.model';

@Injectable({
    providedIn: 'root',
})
export class SectionsService extends GenericReadOnlyService<SectionModel> {
    constructor(protected injector: Injector) {
        super(injector);
    }

    protected _modelName = 'sections';
}
