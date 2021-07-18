export const BtnColors =
  {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
    link: 'link'
  } as const;

export type BtnColor = keyof typeof BtnColors

export const BtnTypes =
  {
    button: 'button',
    submit: 'submit',
    reset: 'reset'
  } as const;

export type BtnType = keyof typeof BtnTypes
