import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldModel, ValidatorModel, ValidatorTypes } from './shared/models';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'formidable-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit
{
  @Input() fields: FieldModel[];
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();
  form: FormGroup;
  loading = false;

  constructor(private readonly _formBuilder: FormBuilder) {}

  get value(): Record<string, unknown>
  {
    return this.form.value as Record<string, unknown>;
  }

  private static _getValidatorFn(validator: ValidatorModel): ValidatorFn
  {
    switch (validator.type)
    {
      case ValidatorTypes.maxLength:
        return Validators.maxLength(parseInt(validator.constraint));
      case ValidatorTypes.minLength:
        return Validators.minLength(parseInt(validator.constraint));
      case ValidatorTypes.regex:
        return Validators.pattern(validator.constraint);
      case ValidatorTypes.email:
        return Validators.email;
      case ValidatorTypes.required:
        return Validators.required;
      case ValidatorTypes.max:
        return Validators.max(parseInt(validator.constraint));
      case ValidatorTypes.min:
        return Validators.min(parseInt(validator.constraint));
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
      this._validateAllFormFields();
    }
    this.loading = false;
  }

  private _createFormGroup(): FormGroup
  {
    const group = this._formBuilder.group({});
    this.fields.forEach((field) =>
    {
      const control = this._formBuilder.control(
        field.value,
        this._bindValidators(field.validators),
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  private _bindValidators(validators: ValidatorModel[]): ValidatorFn | null
  {
    const validList: ValidatorFn[] = [];
    validators.forEach((validator) =>
    {
      validList.push(FormBuilderComponent._getValidatorFn(validator));
    });
    return Validators.compose(validList);
  }

  private _validateAllFormFields(): void
  {
    Object.keys(this.form.controls).forEach((field) =>
    {
      this.form.get(field)?.markAsTouched({ onlySelf: true });
    });
  }
}
