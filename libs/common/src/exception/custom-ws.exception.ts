import { IWsException } from '@app/common/interfaces';
import { WsException } from '@nestjs/websockets';

export class CustomWsExceptionFilter extends WsException {
  constructor(message: string | IWsException) {
    if (message === 'Unauthorized') {
      super({
        statusCode: 401,
        message: 'Unauthorized',
      });
    } else if (typeof message === 'object') {
      super({
        statusCode: message.statusCode || 500,
        message: message.message,
        eventMessage: message.eventMessage,
      } as IWsException);
    } else {
      super({
        statusCode: 500,
        message: message,
      });
    }
  }
}
