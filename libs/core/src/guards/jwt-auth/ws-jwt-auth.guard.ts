import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/core/decorators';
import { ISocket } from '@app/common';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  @Inject(Reflector) private readonly reflector!: Reflector;
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req: ISocket = context.switchToWs().getClient();

    const bearerToken = req.handshake.headers.authorization?.trim();

    req.eventName = context.switchToWs().getPattern();

    if (isPublic && !bearerToken) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
