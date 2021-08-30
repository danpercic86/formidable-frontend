import { KeysOf, ValuesOf } from '../utils/typings';

export const BtnColors = {
  primary: 'primary',
  accent: 'accent',
  warn: 'warn',
  white: undefined,
} as const;

export type BtnColor = ValuesOf<typeof BtnColors>;

export const BtnTypes = {
  button: 'button',
  submit: 'submit',
  reset: 'reset',
} as const;

export type BtnType = KeysOf<typeof BtnTypes>;
export type BtnValues = ValuesOf<typeof BtnTypes>;
