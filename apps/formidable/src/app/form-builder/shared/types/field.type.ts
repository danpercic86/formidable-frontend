export const FieldTypes = {
  text: 'text',
  email: 'email',
  url: 'url',
  integer: 'integer',
  decimal: 'decimal',
  // file = 'file',
  // checkbox = 'checkbox',
  // radio = 'radio',
  // select = 'select',
} as const;

export type FieldType = keyof typeof FieldTypes;
