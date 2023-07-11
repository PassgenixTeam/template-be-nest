import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProfileResponseDto } from 'src/modules/user/dto/get-user.dto';
import {
  ILoginRequestDto,
  ILoginResponseDto,
  IToken,
} from 'src/shared/dto/auth/login.dto';

export class LoginRequestDto implements ILoginRequestDto {
  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsNotEmpty()
  password!: string;
}

@Expose()
class TokenResponseDto implements IToken {
  @ApiResponseProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken!: string;

  @ApiResponseProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken!: string;

  @ApiResponseProperty({ type: Number, example: 3600 })
  expiredIn!: number;
}

export class LoginResponseDto implements ILoginResponseDto {
  @ApiResponseProperty({ type: ProfileResponseDto })
  @Expose()
  user!: ProfileResponseDto;

  @ApiResponseProperty({
    type: TokenResponseDto,
  })
  @Expose()
  token!: TokenResponseDto;
}
