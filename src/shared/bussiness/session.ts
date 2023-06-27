import { IBase } from 'src/shared/bussiness/base';
import { IUser } from 'src/shared/bussiness/user';

export const SESSION_COLLECTION = 'sessions';

export interface ISession extends IBase {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
  idUser: string;
  user?: IUser;
}
