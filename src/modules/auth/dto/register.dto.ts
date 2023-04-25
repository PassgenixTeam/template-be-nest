import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, example: 'Wick' })
  @IsNotEmpty()
  lastName: string;
}
