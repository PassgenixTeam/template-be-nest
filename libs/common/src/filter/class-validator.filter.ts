import { ValidatorException } from '@app/common/exception/validator.exception';
import { IResponse } from '@app/common/interfaces';
import { IValidatorError } from '@app/common/interfaces/validator.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';

@Catch(ValidatorException)
export class ClassValidatorFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = exception.getStatus();
    const res = exception.getResponse();
    if (typeof res === 'object' && 'message' in res && 'error' in res) {
      const validationErrors = res['message'] as ValidationError[];
      const message: IValidatorError[] = validationErrors.map((error) => {
        return {
          property: error.property,
          constraints: Object.values(error.constraints!).map(
            (constraint) => constraint,
          ),
        };
      });

      const errorResponse: IResponse<any> = {
        statusCode,
        message: message,
        error: res['error'] as string,
        currentTime: new Date().getTime(),
      };

      response.status(statusCode).json(errorResponse);
    }

    return;
  }
}
