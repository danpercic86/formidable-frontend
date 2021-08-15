import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FieldComponent, FieldTypes, ValidatorType, ValidatorTypes } from '@builder/shared';

@Component({
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FieldComponent {
  readonly step = this._step;

  readonly pattern = this._getConstraint(ValidatorTypes.pattern);

  readonly minlength = this._getConstraint(ValidatorTypes.minlength);

  readonly maxlength = this._getConstraint(ValidatorTypes.maxlength);

  readonly min = this._getConstraint(ValidatorTypes.min);

  readonly max = this._getConstraint(ValidatorTypes.max);

  constructor(protected readonly _injector: Injector) {
    super(_injector);
  }

  private get _step(): string {
    switch (this.field.type) {
      case FieldTypes.integer:
        return '1';
      case FieldTypes.decimal:
        return '0.01';
      default:
        return '';
    }
  }

  private _getConstraint(type: ValidatorType): string {
    switch (this.field.type) {
      case FieldTypes.decimal:
      case FieldTypes.integer: {
        const validator = this._validators(type);
        return validator ? validator.constraint : '';
      }
      default:
        return '';
    }
  }
}
