import { Injectable, Injector } from '@angular/core';
import { GenericReadOnlyService } from '@services/generics/generic-read-only.service';
import { FormModel } from '@models/form.model';
import { IFormService } from '@shared/interfaces/form.interface';

@Injectable({
    providedIn: 'root',
})
export class FormsService
    extends GenericReadOnlyService<FormModel>
    implements IFormService
{
    protected _modelName = 'forms';

    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
