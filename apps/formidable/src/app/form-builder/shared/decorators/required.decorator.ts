export type Condition<T> = (thisArg: T) => boolean;

export function Required<T>(condition: Condition<T> = () => true): PropertyDecorator {
  return function (target: Object, propertyKey: PropertyKey) {
    Object.defineProperty(target, propertyKey, {
      get() {
        if (condition(this))
          throw new Error(`Attribute ${String(propertyKey)} is required`);
      },
      set(value: unknown) {
        Object.defineProperty(this, propertyKey, {
          value,
          writable: true,
        });
      },
    });
  };
}
