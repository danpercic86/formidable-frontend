import { FieldModel, FieldTypes, ValidatorModel, ValidatorTypes } from './models';
import { FormGroup } from '@angular/forms';

export abstract class FieldComponent {
    field: FieldModel;
    group: FormGroup;

    public get isRequired(): boolean {
        const validator = this.field.validators.find((v) => v.type === ValidatorTypes.required);
        return !!validator;
    }

    public getConstraint(type: ValidatorTypes): string {
        let validator: ValidatorModel | undefined;
        switch (this.field.type) {
            case FieldTypes.decimal:
            case FieldTypes.integer:
                return '';
            default:
                validator = this.field.validators.find((v) => v.type === type);
                return validator ? validator.constraint : '';
        }
    }

    public get type(): string {
        switch (this.field.type) {
            case FieldTypes.integer:
            case FieldTypes.decimal:
                return 'number';
            default:
                return this.field.type;
        }
    }
}
