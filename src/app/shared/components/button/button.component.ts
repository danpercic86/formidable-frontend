import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BtnColor = 'primary' | 'accent' | 'warn' | 'link';

export enum BtnColors {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
  link = 'link',
}

export type BtnType = 'button' | 'submit' | 'reset';

export enum BtnTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

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
