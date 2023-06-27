import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EnumTransform } from '@app/common';
import { FILE_STATUS } from 'src/shared/bussiness/upload';

export class FilterFileDto {
  @ApiProperty({ required: false, enum: FILE_STATUS })
  @IsOptional()
  @IsEnum(FILE_STATUS)
  @EnumTransform(FILE_STATUS)
  status: FILE_STATUS;
}
