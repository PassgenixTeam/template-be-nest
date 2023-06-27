import { ROLE } from '@app/common';
import { IBase } from 'src/shared/bussiness/base';
import { ISession } from 'src/shared/bussiness/session';

export const USER_COLLECTION = 'user';

export interface IUser extends IBase {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isActive: boolean;
  role: ROLE;
  loginSession: ISession;
  cacheId: string;
}
