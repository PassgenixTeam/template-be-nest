import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { HTTP_METHOD } from '../../../../common/src/enums/http-method.enum';

const routerPathPassAuth = [
  // {
  //   path: '',
  //   method: HTTP_METHOD.GET,
  // }
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const route: string = req.route.path;
    const method = req.method;

    const bearerToken = req.headers.authorization?.trim();

    if (
      routerPathPassAuth.some((r) => r.path === route && r.method === method) &&
      !bearerToken
    ) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
