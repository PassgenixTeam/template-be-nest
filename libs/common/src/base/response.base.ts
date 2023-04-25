import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiResponseProperty({
    example: '',
  })
  statusCode?: number;

  @ApiResponseProperty({
    example: new Date().getTime(),
  })
  currentTimestamp?: number;
  data: any;
  message?: string;
  errorCode?: number | string;
}
