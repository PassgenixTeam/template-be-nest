import { CustomWsExceptionFilter } from '@app/common/exception/custom-ws.exception';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SessionService } from 'src/modules/session/session.service';
import { EVENT_SOCKET } from 'src/shared/socket/event';
export class BaseGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger;
  private service: any;

  private readonly jwtService: JwtService;

  constructor(
    logger: Logger,
    service: any,
    private readonly sessionService: SessionService,
  ) {
    this.logger = logger;
    this.service = service;
    this.jwtService = new JwtService();
  }

  afterInit(server: any) {
    this.logger.verbose(`WebSocket listening!`);
    this.service.initServer(server);
  }

  async handleConnection(client: Socket) {
    try {
      const accessToken = client.handshake.headers.authorization?.split(' ')[1];
      if (!accessToken) {
        throw new CustomWsExceptionFilter('Unauthorized');
      }

      const { uid, cacheId } = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.sessionService.validateSession({
        userId: uid,
        cacheId,
        token: accessToken!,
      });

      if (!user) {
        throw new CustomWsExceptionFilter('Unauthorized');
      }

      this.logger.verbose(`Connection: ${client.id}`);
    } catch (error) {
      console.log(error);

      client.emit(EVENT_SOCKET.ERROR, {
        statusCode: 401,
        message: 'Unauthorized',
        currentTime: new Date().getTime(),
      });
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    this.logger.verbose(`Disconnect ${client.id}`);
  }
}
