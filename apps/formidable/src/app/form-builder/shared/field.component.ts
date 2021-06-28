import {
  FieldTypes,
  IField,
  IValidator,
  ValidatorType,
  ValidatorTypes
} from './models';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { trackByFn } from './functions';
import { Directive } from '@angular/core';
import { ValidatorsService } from '../../core/services/components/validators.service';

@Directive({
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FieldComponent
    }
  ]
})
export abstract class FieldComponent implements Validator
{
  field: IField;
  form: FormGroup;

  trackByFn = trackByFn;

  constructor(private readonly _validatorsService: ValidatorsService)
  {
  }

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
    return this.form.get(this.field.name);
  }

  validators(): IValidator[];
  validators(byType: ValidatorType): IValidator | undefined;
  validators(type?: ValidatorType): IValidator | IValidator[] | undefined
  {
    const validators = this.field.validators;
    return type ? validators.find(v => v.type === type) : validators;
  }

  validate(): ValidationErrors | null
  {
    const errors = this._validatorsService.validate(this.form);
    return errors[this.field.name] ? errors[this.field.name] : null;
  }

  // getConstraint(type: ValidatorType): string
  // {
  //   switch (this.field.type)
  //   {
  //     case FieldTypes.decimal:
  //     case FieldTypes.integer:
  //       return '';
  //     default:
  //     {
  //       const validator = this.validators(type);
  //       return validator ? validator.constraint : '';
  //     }
  //   }
  // }
}
