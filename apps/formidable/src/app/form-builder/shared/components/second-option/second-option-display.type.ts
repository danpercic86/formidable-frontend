import { KeysOf } from '../../../../shared/utils/typings';

export const SecondOptionDisplays = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const;

export type SecondOptionDisplay = KeysOf<typeof SecondOptionDisplays>;
