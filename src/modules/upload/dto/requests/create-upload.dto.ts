import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  type: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  size: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  url: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  key: string;
}
