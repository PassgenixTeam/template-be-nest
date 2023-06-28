import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ILoginRequestDto } from 'src/shared/dto/auth/login.request.dto';

export class LoginDto implements ILoginRequestDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsNotEmpty()
  password!: string;
}
