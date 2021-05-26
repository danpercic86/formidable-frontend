import { Injectable } from '@angular/core';
import { IValidator, ValidatorTypes } from '@builder/shared';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService
{
  private static _getValidatorFn({
    constraint,
    type
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

  static compose(validators: IValidator[]): ValidatorFn | null
  {
    return Validators.compose(validators.map(ValidatorsService._getValidatorFn));
  }

  validate(form: FormGroup): void
  {
    Object.keys(form.controls).forEach(fieldName =>
    {
      form.get(fieldName)?.markAsTouched({ onlySelf: true });
    });
  }
}
