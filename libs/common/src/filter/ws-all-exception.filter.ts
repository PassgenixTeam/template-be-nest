import { IResponse } from '@app/common/interfaces';
import { IWsException } from '@app/common/interfaces/ws-exception.interface';
import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EVENT_SOCKET } from 'src/shared/socket/event';

@Catch()
export class WsAllExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(WsAllExceptionsFilter.name);
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client: Socket = ctx.getClient();

    this.logger.error(exception.message);
    console.log(exception);

    if (exception instanceof WsException) {
      const errorMessage: IWsException = exception.getError() as IWsException;

      const res: IResponse<any> = {
        statusCode: 500,
        message: errorMessage.toString(),
        currentTime: new Date().getTime(),
        eventMessage: errorMessage.toString(),
      };

      if (typeof errorMessage === 'object') {
        res.statusCode = errorMessage.statusCode || 500;
        res.message = errorMessage.message;
        res.eventMessage = errorMessage.eventMessage;
      }

      client.emit(EVENT_SOCKET.ERROR, res);
    }
  }
}
