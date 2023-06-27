import { UserEntity } from '../../user/schema/user.schema';

export class CreateSessionDto {
  accessToken: string;

  refreshToken: string;

  user: UserEntity;
}
