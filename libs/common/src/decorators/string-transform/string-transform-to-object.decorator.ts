import { Transform, TransformOptions } from 'class-transformer';
import { isArray, isJSON } from 'class-validator';

/**
 * A class representing a string transformation object.
 * @example
 * const transformObj = StringTransformObject();
 * const plainObj = transformObj.transform({ value: '{"name": "John", "age": 30}' });
 * console.log(plainObj); // { name: "John", age: 30 }
 */
export const StringTransformToObject = (option?: TransformOptions) =>
  Transform(
    ({ value }) => {
      if (typeof value === 'string' && (isJSON(value) || isArray(value)))
        return JSON.parse(value);
    },
    {
      toPlainOnly: true,
      ...option,
    },
  );
