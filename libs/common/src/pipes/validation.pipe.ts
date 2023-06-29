import { ValidatorException } from '@app/common/exception/validator.exception';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidatorException(errors);
      },
    });
  }
}
