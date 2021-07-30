export type KeysOf<T extends Record<string, unknown>> = keyof T;
export type ValuesOf<T extends Record<string, unknown>> = T[keyof T];
