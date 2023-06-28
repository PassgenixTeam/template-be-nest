import { ROLE } from '@app/common';
import { IBase } from 'src/shared/business/base';

export const USER_COLLECTION = 'user';
export interface IUser extends IBase {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isActive: boolean;
  role: ROLE;
}
