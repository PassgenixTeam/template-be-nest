import { IBase } from 'src/shared/business/base';

export const SESSION_COLLECTION = 'session';
export interface ISession extends IBase {
  accessToken: string;
  refreshToken: string;
  expiredAt?: Date;
  user?: any;
}
