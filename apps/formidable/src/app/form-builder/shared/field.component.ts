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
import { Directive, OnInit } from '@angular/core';

@Directive()
export abstract class FieldComponent implements OnInit
{
  field!: IField;
  form!: FormGroup;

  required = false;
  type = '';
  control?: AbstractControl;
  validators = Set<IValidator>();

  readonly trackByFn = trackBy();

  constructor()
  {
    console.log(this.field);
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
    const control = this.form.get(this.field.name);
    if (control === null) throw new Error('Something went wrong, control is null!');
    return control;
  }

  ngOnInit(): void
  {
    this.required = this._isRequired;
    this.type = this._type;
    this.control = this._control;
    this.validators = this._validators();
  }

  protected _validators(): Set<IValidator>;
  protected _validators(byType: ValidatorType): IValidator | undefined;
  protected _validators(type?: ValidatorType): IValidator | Set<IValidator> | undefined
  {
    console.log('validators');
    const validators = this.field.validators;
    return type ? validators.find(v => v.type === type) : validators;
  }
}
