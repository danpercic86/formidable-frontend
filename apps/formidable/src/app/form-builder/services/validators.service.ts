import { Injectable } from '@angular/core';
import { IValidator, ValidatorTypes } from '@builder/shared';
import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Set } from 'immutable';

@Injectable()
export class ValidatorsService {
  static compose(rawValidators: Set<IValidator>): ValidatorFn[] {
    const validators = rawValidators.map(ValidatorsService._getValidatorFn);
    const composedValidators = Validators.compose([...validators]);
    return composedValidators ? [composedValidators] : [];
  }

  static validate(form: FormGroup): Record<string, ValidationErrors> {
    const errors: Record<string, ValidationErrors> = {};

    Object.keys(form.controls).forEach(fieldName => {
      const control = form.controls[fieldName];

      if (control.errors) errors[fieldName] = control.errors;

      control.markAsTouched({ onlySelf: true });
    });

    return errors;
  }

  static validateControl(form: FormGroup, formControlName: string): ValidationErrors {
    const control = form.controls[formControlName];
    control.markAsTouched({ onlySelf: true });

    return control.errors ?? {};
  }

  private static _getValidatorFn({ constraint, type }: IValidator): ValidatorFn | undefined {
    switch (type) {
      case ValidatorTypes.maxlength:
        return Validators.maxLength(parseInt(constraint, 10));
      case ValidatorTypes.minlength:
        return Validators.minLength(parseInt(constraint, 10));
      case ValidatorTypes.pattern:
        return Validators.pattern(constraint);
      case ValidatorTypes.email:
        return Validators.email;
      case ValidatorTypes.required:
        return Validators.required;
      case ValidatorTypes.max:
        return Validators.max(parseInt(constraint, 10));
      case ValidatorTypes.min:
        return Validators.min(parseInt(constraint, 10));
      default:
        return undefined;
    }
  }
}
