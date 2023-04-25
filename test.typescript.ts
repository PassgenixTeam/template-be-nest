import { plainToInstance } from 'class-transformer';

interface ITest {
  name: string;
  age: number;
  createdAt: number;
}

class ITest2 {
  name: string;
  age: number;
}

function pick(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function () {
    console.log('abc', new ITest2());

    const result = original.apply(this, arguments);
    return {
      name: result.name,
      age: result.age,
    };
  };
  return descriptor;
}

class Test {
  @pick
  findOne() {
    return {
      name: 'Thắng',
      age: 18,
      createdAt: 123547546735423,
    };
  }
}

const abc = new Test();

console.log(abc.findOne());
