export interface IResponseDto {
  statusCode?: number;
  currentTimestamp?: number;
  data: any;
  message?: string;
  errorCode?: number | string;
}
