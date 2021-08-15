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
import { Directive, Injector } from '@angular/core';
import { FIELD, FORM } from './tokens';

@Directive()
export abstract class FieldComponent
{
  readonly field: IField = this._injector.get<IField>(FIELD);
  readonly form: FormGroup = this._injector.get<FormGroup>(FORM);
  readonly required = this._isRequired;
  readonly type = this._type;
  readonly control = this._control;
  readonly validators = this._validators();
  readonly trackByFn = trackBy();

  constructor(protected readonly _injector: Injector
  )
  {
  }

  protected get _type(): string
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

  protected get _isRequired(): boolean
  {
    return !!this._validators(ValidatorTypes.required) || this.field.is_required;
  }

  protected get _control(): AbstractControl | never
  {
    const control = this.form.get(this.field.id.toString());
    if (control === null) throw new Error('Something went wrong, control is null!');
    return control;
  }

  protected _validators(): Set<IValidator>;
  protected _validators(byType: ValidatorType): IValidator | undefined;
  protected _validators(
    type?: ValidatorType
  ): IValidator | Set<IValidator> | undefined
  {
    const validators = this.field.validators;
    return type ? validators.find(v => v.type === type) : validators;
  }
}
