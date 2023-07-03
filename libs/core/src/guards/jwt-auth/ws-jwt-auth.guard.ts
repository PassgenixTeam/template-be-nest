import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLE } from '@app/common';
import { ROLES_KEY } from '@app/common/constants/constant';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  @Inject(Reflector) private readonly reflector!: Reflector;
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector?.get<ROLE[]>(ROLES_KEY, context.getHandler());

    const req = context.switchToWs().getClient();

    const bearerToken = req.handshake.headers.authorization?.trim();

    if (roles?.includes(ROLE.GUEST) && !bearerToken) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
