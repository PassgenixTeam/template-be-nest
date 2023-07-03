import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';
import { ROLE } from '@app/common';
import { IS_PUBLIC_KEY } from '@app/core/decorators';
import { CustomWsExceptionFilter } from '@app/common/exception/custom-ws.exception';

@Injectable()
export class WsRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<ROLE[]>('roles', context.getHandler());
    const request = context.switchToWs().getClient();
    if (isEmpty(roles)) {
      return true;
    }
    const role = request.user?.role;
    const roleAuth = role && this.hasRole(role, roles);
    if (!roleAuth) {
      throw new CustomWsExceptionFilter({
        statusCode: 403,
        message: 'Forbidden',
      });
    }
    return true;
  }

  private hasRole(role: ROLE, roles: ROLE[]) {
    return roles.includes(role);
  }
}
