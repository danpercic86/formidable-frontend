import {
  IField,
  FieldTypes,
  IValidator,
  ValidatorType,
  ValidatorTypes,
} from './models';
import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class FieldComponent
{
  field: IField;
  group: FormGroup;

  get isRequired(): boolean
  {
    return !!this.validators(ValidatorTypes.required) || this.field.is_required;
  }

  get type(): string
  {
    switch (this.field.type)
    {
      case FieldTypes.integer:
      case FieldTypes.decimal:
        return 'number';
      default:
        return this.field.type;
    }
  }

  get control(): AbstractControl | null
  {
    return this.group.get(this.field.name);
  }

  validators(): IValidator[];
  validators(byType: ValidatorType): IValidator | undefined;
  validators(type?: ValidatorType): IValidator | IValidator[] | undefined
  {
    const validators = this.field.validators;
    return type ? validators.find(v => v.type === type) : validators;
  }

  getConstraint(type: ValidatorType): string
  {
    switch (this.field.type)
    {
      case FieldTypes.decimal:
      case FieldTypes.integer:
        return '';
      default: {
        const validator = this.validators(type);
        return validator ? validator.constraint : '';
      }
    }
  }
}
