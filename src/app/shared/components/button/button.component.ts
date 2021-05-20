import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BtnColor, BtnColors, BtnType, BtnTypes } from '../../enums/buttons';

@Component({
  selector: 'formidable-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent
{
  @Input()
  text = 'Submit';
  @Input()
  matIcon: string;
  @Input()
  loading = false;
  @Input()
  disabled = false;
  @Input()
  routerLink: string;
  @Input()
  color: BtnColor = BtnColors.primary;
  @Input()
  type: BtnType = BtnTypes.button;
  @Output()
  action = new EventEmitter<Event>();
}
