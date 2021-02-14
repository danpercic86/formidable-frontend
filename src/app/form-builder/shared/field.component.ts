import { FieldModel } from './models';
import { FormGroup } from '@angular/forms';

export abstract class FieldComponent {
    field: FieldModel;
    group: FormGroup;
}
