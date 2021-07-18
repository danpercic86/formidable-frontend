type Model = { readonly id?: string, readonly name?: string }

export function trackByFn<T extends Model>(index: number, item: T): number | string
{
  if ('id' in item && item.id)
    return item.id;
  if ('name' in item && item.name)
    return item.name;

  return index;
}
