import { EnumTransform } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { FILE_STATUS } from 'src/shared/business/upload';

export class FilterFileDto {
  @ApiProperty({ required: false, enum: FILE_STATUS })
  @IsOptional()
  @IsEnum(FILE_STATUS)
  @EnumTransform(FILE_STATUS)
  status?: FILE_STATUS;
}
