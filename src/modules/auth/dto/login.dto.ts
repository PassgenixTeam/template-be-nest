import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsNotEmpty()
  password: string;
}
