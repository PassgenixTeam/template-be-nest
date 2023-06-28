import { IBase } from 'src/shared/business/base';

export enum FILE_STATUS {
  PENDING = 'pending',
  USING = 'using',
  DELETED = 'deleted',
}

export interface IUpload extends IBase {
  type: string;
  size: number;
  url: string;
  key: string;
  status: FILE_STATUS;
}
