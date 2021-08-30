export const LinkTextColors = {
  primary: 'primary',
  accent: 'accent',
} as const;

export type LinkTextColor = keyof typeof LinkTextColors;
