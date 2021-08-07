import {
  FieldTypes,
  IField,
  IValidator,
  trackBy,
  ValidatorType,
  ValidatorTypes
} from '@builder/shared';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Set } from 'immutable';

export abstract class FieldComponent
{
  field!: IField;
  form!: FormGroup;

  readonly trackByFn = trackBy();

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

  get control(): AbstractControl | never
  {
    const control = this.form.get(this.field.name);
    if (control === null) throw new Error('Something went wrong, control is null!');
    return control;
  }

  validators(): Set<IValidator>;
  validators(byType: ValidatorType): IValidator | undefined;
  validators(type?: ValidatorType): IValidator | Set<IValidator> | undefined
  {
    const validators = this.field.validators;
    return type ? validators.find(v => v.type === type) : validators;
  }
}
