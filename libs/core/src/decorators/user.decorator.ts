import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../../../src/modules/user/entities/user.entity';

type UserField = keyof UserEntity;

export const AuthUser = createParamDecorator(
  (data: UserField, ctx: ExecutionContext): UserEntity | string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
