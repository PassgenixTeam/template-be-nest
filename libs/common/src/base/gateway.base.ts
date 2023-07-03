import { WsAllExceptionsFilter } from '@app/common/filter';
import { WsJwtAuthGuard } from '@app/core/guards/jwt-auth/ws-jwt-auth.guard';
import { Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

export class BaseGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger;
  private service: any;

  constructor(logger: Logger, service: any) {
    this.logger = logger;
    this.service = service;
  }

  afterInit(server: any) {
    this.logger.verbose(`WebSocket listening!`);
    this.service.initServer(server);
  }

  async handleConnection(client: any) {
    try {
      const authGuard = new WsJwtAuthGuard();
      const executionContext = new ExecutionContextHost([client]);
      await authGuard.canActivate(executionContext);
      this.logger.verbose(`Connection: ${client.id}`);
    } catch (error) {
      const httpExceptionFilter = new WsAllExceptionsFilter();
      const host = new ExecutionContextHost([client]);
      httpExceptionFilter.catch(error as any, host);
    }
  }

  handleDisconnect(client: any) {
    this.logger.verbose(`Disconnect ${client.id}`);
  }
}
