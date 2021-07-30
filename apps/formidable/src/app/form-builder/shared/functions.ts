type Model = { readonly id?: string, readonly name?: string }

export function trackBy<T extends Model>(fn?: (item: T) => string)
{
  return function(index: number, item: T): number | string
  {
    if (fn) return fn(item);

    if ('id' in item && item.id)
      return item.id;
    if ('name' in item && item.name)
      return item.name;

    return index;
  };
}
