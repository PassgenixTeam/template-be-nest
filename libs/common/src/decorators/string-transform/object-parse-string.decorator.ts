import { Transform } from 'class-transformer';
import { isObject } from 'class-validator';

/**
 * A transformation function that converts an object to a JSON string.
 * @returns A transformer function used to convert an object to a JSON string.
 * @example
 * const transformStr = ObjectTransformString();
 * const plainObj = transformStr.transform({ value: { name: "John", age: 30 } });
 * console.log(plainObj); // '{"name": "John", "age": 30}'
 */
export const ObjectTransformString = () =>
  Transform(
    ({ value }) => {
      if (typeof value === 'object' && isObject(value))
        return JSON.stringify(value);
    },
    {
      toClassOnly: true,
    },
  );
