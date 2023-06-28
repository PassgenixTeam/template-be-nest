import { IBase } from 'src/shared/business/base';

export interface ISession extends IBase {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
  user?: any;
}
