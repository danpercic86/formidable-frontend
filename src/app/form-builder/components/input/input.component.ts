import { Component } from '@angular/core';
import { FieldComponent } from '../../shared/field.component';
import { FieldTypes, ValidatorModel, ValidatorTypes } from '../../shared/models';

@Component({
    selector: 'formidable-input',
    templateUrl: './input.component.html',
})
export class InputComponent extends FieldComponent {
    validatorTypes = ValidatorTypes;

    get step(): string {
        switch (this.field.type) {
            case FieldTypes.integer:
                return '1';
            case FieldTypes.decimal:
                return '0.01';
            default:
                return '';
        }
    }

    getNumberFieldConstraint(type: ValidatorTypes): string {
        let validator: ValidatorModel | undefined;
        switch (this.field.type) {
            case FieldTypes.decimal:
            case FieldTypes.integer:
                validator = this.field.validators.find(
                    (validator) => validator.type === type,
                );
                return validator ? validator.constraint : '';
            default:
                return '';
        }
    }
}
