import { ClassConstructor, plainToInstance } from 'class-transformer';

export const ResponseTransform =
  <T>(TargetArg: ClassConstructor<T>) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const result = await original.apply(this, args);

      return plainToInstance(TargetArg, result, {
        excludeExtraneousValues: true,
      });
    };

    return descriptor;
  };
