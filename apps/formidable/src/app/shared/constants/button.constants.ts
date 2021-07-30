import { KeysOf, ValuesOf } from '../utils/typings';

export const BtnColors =
  {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
    link: 'link'
  } as const;

export type BtnColor = KeysOf<typeof BtnColors>

export const BtnTypes =
  {
    button: 'button',
    submit: 'submit',
    reset: 'reset'
  } as const;

export type BtnType = KeysOf<typeof BtnTypes>
export type BtnValues = ValuesOf<typeof BtnTypes>
