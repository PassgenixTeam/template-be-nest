import { Logger } from '@nestjs/common';
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

  handleConnection(client: any) {
    this.logger.verbose(`Connection: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.verbose(`Disconnect ${client.id}`);
  }
}
