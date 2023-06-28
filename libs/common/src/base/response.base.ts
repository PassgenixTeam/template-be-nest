import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IBaseResponseDto } from 'src/shared/dto/base-response.dto';
import { IResponseDto } from 'src/shared/dto/response.dto';

export class BaseResponseDto implements IBaseResponseDto {
  @Expose()
  @ApiResponseProperty({ type: 'string', format: 'uuid' })
  id!: string;

  @Expose()
  @ApiResponseProperty({
    example: new Date().getTime(),
  })
  createdAt!: Date;

  @Expose()
  @ApiResponseProperty({
    example: new Date().getTime(),
  })
  updatedAt!: Date;
}

export class ResponseDto implements IResponseDto {
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
