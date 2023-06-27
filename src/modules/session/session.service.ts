import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserTokenDto } from './dto/user-token.dto';
import { appConfig } from '@app/core';
import { RedisService } from '../../../libs/core/src/cache/redis.service';
import { User } from 'src/modules/user/schema/user.schema';
import { SessionRepository } from 'src/modules/session/session.repository';
import { Session } from 'src/modules/session/schema/session.schema';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly redisService: RedisService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const { accessToken, refreshToken, user } = createSessionDto;
    return this.sessionRepository.create({
      accessToken,
      refreshToken,
      idUser: user._id,
      expiredAt: null,
    });
  }

  async validateSession(payload: UserTokenDto) {
    const { userId, cacheId, token } = payload;
    const cacheSessionJson = await this.redisService.get(cacheId);

    if (cacheSessionJson) {
      const cacheSession: User = JSON.parse(cacheSessionJson);
      if (
        cacheSession?.loginSession?.accessToken === token &&
        cacheSession._id === userId
      ) {
        return cacheSession;
      }
    }

    const session = await this.sessionRepository.findOne(
      {
        idUser: userId,
        expiredAt: null,
        accessToken: token,
      },
      null,
      {
        populate: {
          path: 'user',
        },
      },
    );

    if (session) {
      const user = session.user;

      delete user.password;
      delete session.user;

      const data = {
        ...user,
        loginSession: session,
      };

      await this.redisService.set(
        cacheId,
        JSON.stringify(data),
        appConfig.jwt.JWT_EXPIRES_IN ?? undefined,
      );

      return data as User;
    }
  }

  async findToken(id: string, token: string): Promise<Session> {
    return this.sessionRepository.findOne({
      idUser: id,
      refreshToken: token,
      expiredAt: null,
    });
  }

  async invalidAllSessionByUserId(userId: string): Promise<boolean> {
    return !!this.sessionRepository.updateOne(
      { idU: userId, expiredAt: null },
      { expiredAt: new Date() },
    );
  }

  async invalidSession(id: string): Promise<Session> {
    return this.sessionRepository.updateById(id, { expiredAt: new Date() });
  }
}
