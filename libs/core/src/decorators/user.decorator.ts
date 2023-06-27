import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/schema/user.schema';

type UserField = keyof User;

export const AuthUser = createParamDecorator(
  (data: UserField, ctx: ExecutionContext): User | string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
