import { CustomBadRequestException } from '@app/common/exception/custom-bad-request.exception';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ProfileResponseDto } from 'src/modules/user/dto/get-user.dto';
import { User } from 'src/modules/user/schema/user.schema';
import { UserRepository } from 'src/modules/user/user.repository';
import { ERROR_MESSAGES } from 'src/shared/constants/errors';
import { v4 as uuidV4 } from 'uuid';
import {
  TokenPayload,
  customPlaintToInstance,
  sha512,
} from '../../../libs/common/src';
import { RedisService, appConfig } from '../../../libs/core/src';
import { SessionService } from '../session/session.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private redisService: RedisService,
  ) {}

  async login(input: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = input;

    const user = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new CustomBadRequestException(
        ERROR_MESSAGES.EmailOrPasswordIncorrect,
      );
    }

    if (user.password !== sha512(password)) {
      throw new CustomBadRequestException(
        ERROR_MESSAGES.EmailOrPasswordIncorrect,
      );
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    await this.sessionService.create({
      accessToken,
      refreshToken,
      user: user,
    });

    return customPlaintToInstance(LoginResponseDto, {
      user: customPlaintToInstance(ProfileResponseDto, user),
      token: {
        accessToken,
        refreshToken,
        expiredIn: appConfig.jwt.JWT_EXPIRES_IN,
      },
    });
  }

  async register(input: RegisterDto) {
    const { email, password, firstName, lastName } = input;

    const isExistsEmail = await this.userRepository.findOne({
      email,
    });

    if (isExistsEmail) {
      throw new CustomBadRequestException(ERROR_MESSAGES.EmailAlreadyExists);
    }

    return this.userRepository.create(
      plainToInstance(User, {
        email,
        password: sha512(password),
        firstName,
        lastName,
        isActive: false,
      }),
    );
  }

  createAccessToken(user: User): string {
    const token = this.jwtService.sign(
      { uid: user._id, cacheId: uuidV4() },
      {
        expiresIn: appConfig.jwt.JWT_EXPIRES_IN,
        secret: appConfig.jwt.JWT_SECRET_KEY,
      },
    );
    return token;
  }

  createRefreshToken(user: User) {
    const token = this.jwtService.sign(
      { uid: user._id },
      {
        expiresIn: appConfig.jwt.JWT_EXPIRES_IN,
        secret: appConfig.jwt.JWT_SECRET_KEY,
      },
    );
    return token;
  }

  async refreshToken(token: string) {
    const payloadRefreshToken = this.jwtService.decode(token) as TokenPayload;

    const isValidSession = await this.sessionService.findToken(
      payloadRefreshToken.uid,
      token,
    );

    if (!isValidSession) {
      throw new UnauthorizedException();
    }

    const payloadAccessToken = this.jwtService.decode(
      isValidSession.accessToken,
    ) as TokenPayload;

    await this.redisService.del(
      `${isValidSession.idUser}.${payloadAccessToken.cacheId!}`,
    );

    await this.sessionService.invalidSession(isValidSession._id!);
    const accessToken = this.createAccessToken({
      _id: payloadRefreshToken.uid,
    } as User);

    const refreshToken = this.isTokenExpired(payloadRefreshToken)
      ? this.createRefreshToken({
          _id: payloadRefreshToken.uid,
        } as User)
      : token;

    await this.sessionService.create({
      accessToken,
      refreshToken,
      user: {
        _id: payloadRefreshToken.uid,
      } as User,
    });

    return {
      accessToken,
      refreshToken,
      expiredIn: appConfig.jwt.JWT_EXPIRES_IN,
    };
  }

  async logout(user: User) {
    // TODO: implement logout
    await Promise.all([
      this.redisService.del(`${user._id}.${user.cacheId!}`),
      this.sessionService.invalidSession(user.loginSession!._id!),
    ]);

    return true;
  }

  async logoutAll(user: User) {
    // TODO: implement logoutAll

    await Promise.all([
      this.redisService.delAll(`${user._id!}.*`),
      this.sessionService.invalidAllSessionByUserId(user._id!),
    ]);

    return true;
  }

  private isTokenExpired(token: any): boolean {
    const now = Date.now() / 1000;
    return token.exp < now;
  }
}
