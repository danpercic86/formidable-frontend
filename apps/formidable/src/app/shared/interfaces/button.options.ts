import { BtnColor, BtnType } from '@formidable/shared';
import { EventEmitter } from '@angular/core';

export interface IButtonOptions {
  text?: string;
  matIcon?: string;
  loading?: boolean;
  disabled?: boolean;
  routerLink?: string;
  color?: BtnColor;
  type?: BtnType;
  action: EventEmitter<Event | Record<string, unknown>>
}
