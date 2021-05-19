import {
  FieldModel,
  FieldTypes,
  ValidatorModel,
  ValidatorType,
  ValidatorTypes,
} from './models';
import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class FieldComponent
{
  field: FieldModel;
  group: FormGroup;

  get isRequired(): boolean
  {
    const validator = this.validators(ValidatorTypes.required);
    return !!validator || this.field.is_required;
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

  validators(): ValidatorModel[];
  validators(byType: ValidatorType): ValidatorModel | undefined;
  validators(type?: ValidatorType): ValidatorModel | ValidatorModel[] | undefined
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
