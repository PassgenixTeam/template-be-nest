import { UserEntity } from '../../user/entities/user.entity';

export class CreateSessionDto {
  accessToken: string;

  refreshToken: string;

  user: UserEntity;
}
