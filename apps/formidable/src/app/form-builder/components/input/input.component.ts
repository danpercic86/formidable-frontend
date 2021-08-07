import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FieldComponent,
  FieldTypes,
  ValidatorType,
  ValidatorTypes
} from '@builder/shared';

@Component({
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends FieldComponent implements OnInit
{
  step = '';
  pattern = '';
  minlength = '';
  maxlength = '';
  min = '';
  max = '';

  private get _step(): string
  {
    switch (this.field.type)
    {
      case FieldTypes.integer:
        return '1';
      case FieldTypes.decimal:
        return '0.01';
      default:
        return '';
    }
  }

  ngOnInit(): void
  {
    super.ngOnInit();
    this.step = this._step;
    this.pattern = this._getConstraint(ValidatorTypes.pattern);
    this.minlength = this._getConstraint(ValidatorTypes.minlength);
    this.maxlength = this._getConstraint(ValidatorTypes.maxlength);
    this.min = this._getConstraint(ValidatorTypes.min);
    this.max = this._getConstraint(ValidatorTypes.max);
  }

  private _getConstraint(type: ValidatorType): string
  {
    switch (this.field.type)
    {
      case FieldTypes.decimal:
      case FieldTypes.integer:
      {
        const validator = this._validators(type);
        return validator ? validator.constraint : '';
      }
      default:
        return '';
    }
  }
}
