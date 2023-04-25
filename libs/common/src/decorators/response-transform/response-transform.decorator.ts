import { ClassConstructor, plainToClass } from 'class-transformer';

export const ResponseTransform =
  <T>(TargetArg: ClassConstructor<T>) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function () {
      const result = await original.apply(this);

      return plainToClass(TargetArg, result, { excludeExtraneousValues: true });
    };
    return descriptor;
  };
