import { Injectable } from '@angular/core';
import { IValidator, ValidatorTypes } from '@builder/shared';
import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService
{
  private static _getValidatorFn({
    constraint,
    type,
  }: IValidator): ValidatorFn | undefined
  {
    switch (type)
    {
      case ValidatorTypes.maxLength:
        return Validators.maxLength(parseInt(constraint));
      case ValidatorTypes.minLength:
        return Validators.minLength(parseInt(constraint));
      case ValidatorTypes.regex:
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

  static compose(rawValidators: IValidator[]): ValidatorFn[]
  {
    const validators = rawValidators.map(ValidatorsService._getValidatorFn);
    const composedValidators = Validators.compose(validators);
    return composedValidators ? [composedValidators] : [];
  }

  validate(form: FormGroup): {[key: string]: ValidationErrors}
  {
    const errors: {[key: string]: ValidationErrors} = {};

    Object.keys(form.controls).forEach(fieldName =>
    {
      const control = form.controls[fieldName];

      if (control.errors) errors[fieldName] = control.errors;

      control.markAsTouched({ onlySelf: true });
    });

    return errors;
  }
}
