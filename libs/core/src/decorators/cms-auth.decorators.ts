import { WsJwtAuthGuard } from '@app/core/guards/jwt-auth/ws-jwt-auth.guard';
import { WsRolesGuard } from '@app/core/guards/roles/ws-roles.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ROLE } from '../../../common/src/enums/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Auth = (...roles: ROLE[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
};

export const WsAuth = (...roles: ROLE[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(WsJwtAuthGuard, WsRolesGuard),
  );
};
