import { WsException } from '@nestjs/websockets';

export class CustomWsExceptionFilter extends WsException {
  constructor(message: string) {
    super(message);
  }
}
