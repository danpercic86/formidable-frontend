type NullableString = string | null | undefined;

export function isNullOrEmpty(value: NullableString): boolean
{
  return value === '' || value === null || value === undefined;
}

export function isNotNullOrEmpty(value: NullableString): boolean
{
  return !isNullOrEmpty(value);
}

export function error(message?: string): never
{
  throw new Error(message || 'Unknown error occurred!');
}
