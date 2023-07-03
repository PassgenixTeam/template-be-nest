import { IResponse, ISocket, IWsException } from '@app/common/interfaces';
import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { EVENT_SOCKET } from 'src/shared/socket/event';

@Catch()
export class WsAllExceptionsFilter extends BaseWsExceptionFilter {
  constructor() {
    super();
  }

  private readonly logger = new Logger(WsAllExceptionsFilter.name);

  catch(exception: WsException, host: ArgumentsHost) {
    const client: ISocket = host.switchToWs().getClient();

    this.logger.error(exception.message);
    console.log(exception);

    if (exception instanceof WsException) {
      const errorMessage: IWsException = exception.getError() as IWsException;

      const res: IResponse<any> = {
        statusCode: 500,
        message: errorMessage.toString(),
        currentTime: new Date().getTime(),
        eventName: client.eventName,
      };

      if (typeof errorMessage === 'object') {
        res.statusCode = errorMessage.statusCode || 500;
        res.message = errorMessage.message;
      }

      client.emit(EVENT_SOCKET.ERROR, res);
    }
  }
}
