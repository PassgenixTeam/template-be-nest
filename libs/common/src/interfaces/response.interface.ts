import { IValidatorError } from '@app/common/interfaces/validator.interface';

export interface IResponse<T> {
  data?: T;
  statusCode: number;
  message: string | string[] | IValidatorError[];
  error?: string;
  errorCode?: number | string;
  currentTime?: number;
}

export interface IResPagination<T> {
  metadata: T[];
  meta: {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    itemCount: number;
  };
}
