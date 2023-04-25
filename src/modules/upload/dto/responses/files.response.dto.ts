import { BaseResponseDto } from '@app/common/base/response.base';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UploadEntity } from 'src/modules/upload/entities/upload.entity';

export class FilesDto {
  @Expose()
  @ApiResponseProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiResponseProperty({ type: 'string', example: 'image/png' })
  type: string;

  @Expose()
  @ApiResponseProperty({ type: 'number', example: '13160' })
  size: number;

  @Expose()
  @ApiResponseProperty({
    type: 'string',
    example:
      'https://work-from-home-lss.s3.ap-southeast-2.amazonaws.com/1682329355872168232935587256913',
  })
  url: string;

  @Expose()
  @ApiResponseProperty({
    type: 'string',
    example: '1682329355872168232935587256913',
  })
  key: string;
}

export class FileResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: FilesDto })
  data: FilesDto;
}
