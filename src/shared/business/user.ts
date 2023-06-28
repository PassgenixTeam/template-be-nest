import { ROLE } from '@app/common';
import { IBase } from 'src/shared/business/base';

export interface IUser extends IBase {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isActive: boolean;
  role: ROLE;
}
