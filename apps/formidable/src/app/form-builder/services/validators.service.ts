import { Injectable } from '@angular/core';
import { IValidator, ValidatorTypes } from '@builder/shared';
import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Set } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService
{
  static compose(rawValidators: Set<IValidator>): ValidatorFn[]
  {
    const validators = rawValidators.map(ValidatorsService._getValidatorFn);
    const composedValidators = Validators.compose([...validators]);
    return composedValidators ? [composedValidators] : [];
  }

  private static _getValidatorFn({
    constraint,
    type
  }: IValidator): ValidatorFn | undefined
  {
    switch (type)
    {
      case ValidatorTypes.maxlength:
        return Validators.maxLength(parseInt(constraint));
      case ValidatorTypes.minlength:
        return Validators.minLength(parseInt(constraint));
      case ValidatorTypes.pattern:
        return Validators.pattern(constraint);
      case ValidatorTypes.email:
        return Validators.email;
      case ValidatorTypes.required:
        return Validators.required;
      case ValidatorTypes.max:
        return Validators.max(parseInt(constraint));
      case ValidatorTypes.min:
        return Validators.min(parseInt(constraint));
      default:
        return undefined;
    }
  }

  validate(form: FormGroup): Record<string, ValidationErrors>
  {
    const errors: Record<string, ValidationErrors> = {};

    Object.keys(form.controls).forEach(fieldName =>
    {
      const control = form.controls[fieldName];

      if (control.errors) errors[fieldName] = control.errors;

      control.markAsTouched({ onlySelf: true });
    });

    return errors;
  }
}
