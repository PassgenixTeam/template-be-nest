import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLE } from '@app/common';
import { ROLES_KEY } from '@app/common/constants/constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler());

    const req: Request = context.switchToHttp().getRequest();

    const bearerToken = req.headers.authorization?.trim();

    if (roles.includes(ROLE.GUEST) && !bearerToken) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
