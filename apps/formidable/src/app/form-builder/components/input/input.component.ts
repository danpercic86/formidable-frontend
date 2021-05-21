import { Component } from '@angular/core';
import { FieldComponent } from '@builder/shared';
import { FieldTypes, ValidatorType, ValidatorTypes } from '@builder/shared';

@Component({
  selector: 'formidable-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends FieldComponent
{
  validatorTypes = ValidatorTypes;

  get step(): string
  {
    switch (this.field.type)
    {
      case FieldTypes.integer:
        return '1';
      case FieldTypes.decimal:
        return '0.01';
      default:
        return '';
    }
  }

  getNumberFieldConstraint(type: ValidatorType): string
  {
    switch (this.field.type)
    {
      case FieldTypes.decimal:
      case FieldTypes.integer: {
        const validator = this.validators(type);
        return validator ? validator.constraint : '';
      }
      default:
        return '';
    }
  }
}
