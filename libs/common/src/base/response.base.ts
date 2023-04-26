import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResponseDto {
  @Expose()
  @ApiResponseProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiResponseProperty({
    example: new Date().getTime(),
  })
  createdAt: Date;

  @Expose()
  @ApiResponseProperty({
    example: new Date().getTime(),
  })
  updatedAt: Date;
}

export class ResponseDto {
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
