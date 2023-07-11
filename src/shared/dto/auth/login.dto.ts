import { IProfileResponseDto } from 'src/shared/dto/user/profile.dto';

export interface ILoginRequestDto {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
}

export interface ILoginResponseDto {
  user: IProfileResponseDto;
  token: IToken;
}
