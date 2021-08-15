export const ValidatorTypes = {
  min: 'min',
  max: 'max',
  minlength: 'minlength',
  maxlength: 'maxlength',
  pattern: 'pattern',
  email: 'email',
  required: 'required',
} as const;

export type ValidatorType = keyof typeof ValidatorTypes;
