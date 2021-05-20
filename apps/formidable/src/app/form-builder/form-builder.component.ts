import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IField, IValidator, ValidatorTypes } from './shared/models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'formidable-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit
{
  @Input() fields: IField[];
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();
  form: FormGroup;
  loading = false;

  constructor(private readonly _formBuilder: FormBuilder) {}

  get value(): Record<string, unknown>
  {
    return this.form.value as Record<string, unknown>;
  }

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

  ngOnInit(): void
  {
    console.log(this.fields);
    this.form = this._createFormGroup();
  }

  onSubmit(event: Event): void
  {
    this.loading = true;
    event.preventDefault();
    event.stopPropagation();

    if (this.form.valid)
    {
      this.formSubmit.emit(this.form.value);
    }
    else
    {
      this._validateFormFields();
    }

    this.loading = false;
  }

  private _createValidators(validators: IValidator[]): ValidatorFn | null
  {
    return Validators.compose(
      validators.map(FormBuilderComponent._getValidatorFn)
    );
  }

  private _createFormGroup(): FormGroup
  {
    const group = this._formBuilder.group({});
    this.fields.forEach(field =>
    {
      group.addControl(field.name, this._createControl(field));
    });
    return group;
  }

  private _createControl({ validators, name }: IField): FormControl
  {
    return this._formBuilder.control(name, this._createValidators(validators));
  }

  private _validateFormFields(): void
  {
    Object.keys(this.form.controls).forEach(fieldName =>
    {
      this.form.get(fieldName)?.markAsTouched({ onlySelf: true });
    });
  }
}
