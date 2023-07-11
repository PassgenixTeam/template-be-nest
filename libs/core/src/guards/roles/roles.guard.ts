import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';
import { ROLE } from '@app/common';
import { IS_PUBLIC_KEY } from '@app/core/decorators';

@Injectable()
export class RolesGuard implements CanActivate {
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
    const request = context.switchToHttp().getRequest();

    if (isEmpty(roles)) {
      return true;
    }
    const role = request.user?.role;

    const roleAuth = role && this.hasRole(role, roles);

    if (!roleAuth) {
      return false;
    }

    return true;
  }

  private hasRole(role: ROLE, roles: ROLE[]) {
    return roles.includes(role);
  }
}
