import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { BtnColor, BtnColors, BtnType, BtnTypes } from '../../enums/buttons';
import { IButtonOptions } from '../../interfaces/button.options';

@Component({
  selector: 'formidable-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent
{
  @Input()
  text = 'Submit';
  @Input()
  matIcon = '';
  @Input()
  loading = false;
  @Input()
  disabled = false;
  @Input()
  routerLink = '';
  @Input()
  color: BtnColor = BtnColors.primary;
  @Input()
  type: BtnType = BtnTypes.button;
  @Output()
  action = new EventEmitter<Event | Record<string, unknown>>();

  @Input()
  options: IButtonOptions = {
    text: 'Submit',
    action: new EventEmitter<Event | Record<string, unknown>>(),
    type: BtnTypes.button,
    color: BtnColors.primary,
    routerLink: '',
    disabled: false,
    loading: false,
    matIcon: ''
  };
}
