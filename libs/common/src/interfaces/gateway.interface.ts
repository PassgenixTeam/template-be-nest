import { Server } from 'socket.io';

export interface IGatewayBase {
  initServer(server: Server): void;
}
