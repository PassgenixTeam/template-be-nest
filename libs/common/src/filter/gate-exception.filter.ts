import { IResponse } from '@app/common/interfaces';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EVENT_SOCKET } from 'src/shared/socket/event';

@Catch()
export class WsAllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client: Socket = ctx.getClient();

    if (exception instanceof WsException) {
      const errorMessage = exception.getError();
      const res: IResponse<any> = {
        statusCode: 500,
        message: errorMessage.toString(),
        currentTime: new Date().getTime(),
      };

      client.emit(EVENT_SOCKET.ERROR, res);
    }
  }
}
