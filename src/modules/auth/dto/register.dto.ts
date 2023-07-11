import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IRegisterRequestDto } from 'src/shared/dto/auth/register.dto';

export class RegisterDto implements IRegisterRequestDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password!: string;

  @ApiProperty({ type: String, example: 'John' })
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ type: String, example: 'Wick' })
  @IsNotEmpty()
  lastName!: string;
}
