import { User } from 'src/modules/user/schema/user.schema';

export class CreateSessionDto {
  accessToken: string;

  refreshToken: string;

  user: User;
}
