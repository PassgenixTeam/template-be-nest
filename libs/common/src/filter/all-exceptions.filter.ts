import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ErrorCustom } from '@app/common/base';
import { IResponse } from '@app/common/interfaces';
import { ERROR_MESSAGES } from 'src/shared/constants/errors';

@Catch()
export class AllExceptionsFilter
  extends ErrorCustom
  implements ExceptionFilter
{
  constructor() {
    super(ERROR_MESSAGES);
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;

    let { errorCode, message } = this.messageCode(exception);

    const res: IResponse<any> = {
      statusCode: status,
      message,
      errorCode,
      currentTime: new Date().getTime(),
    };

    response.status(status).json(res);
  }
}
