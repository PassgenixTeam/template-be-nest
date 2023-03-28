import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  password: string;
}
