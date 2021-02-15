import { FieldModel } from './models';
import { FormGroup } from '@angular/forms';

export abstract class FieldComponent {
    // @ts-ignore
    field: FieldModel;
    // @ts-ignore
    group: FormGroup;
}
