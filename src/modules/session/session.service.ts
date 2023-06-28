import { appConfig } from '@app/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { RedisService } from '../../../libs/core/src/cache/redis.service';
import { UserEntity } from '../user/entities/user.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserTokenDto } from './dto/user-token.dto';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionEntity: Repository<SessionEntity>,
    private readonly redisService: RedisService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const { accessToken, refreshToken, user } = createSessionDto;
    const session = this.sessionEntity.create({
      accessToken,
      refreshToken,
      user,
    });

    return this.sessionEntity.save(session);
  }

  async validateSession(payload: UserTokenDto) {
    const { userId, cacheId, token } = payload;
    const cacheSessionJson = await this.redisService.get(cacheId);

    if (cacheSessionJson) {
      const cacheSession: UserEntity = JSON.parse(cacheSessionJson);
      if (
        cacheSession?.loginSession?.accessToken === token &&
        cacheSession.id === userId
      ) {
        return cacheSession;
      }
    }

    const session = await this.sessionEntity.findOne({
      where: {
        user: {
          id: userId,
        },
        expiredAt: IsNull(),
        accessToken: token,
      },
      relations: ['user'],
    });

    if (session) {
      const user: Partial<UserEntity> = session.user!;

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

      return data as UserEntity;
    }

    return null;
  }

  async findToken(id: string, token: string): Promise<SessionEntity> {
    return this.sessionEntity.findOneOrFail({
      where: { user: { id }, refreshToken: token, expiredAt: IsNull() },
    });
  }

  async invalidAllSessionByUserId(userId: string): Promise<boolean> {
    return !!(await this.sessionEntity.update(
      { user: { id: userId }, expiredAt: IsNull() },
      { expiredAt: new Date() },
    ));
  }

  async invalidSession(id: string): Promise<UpdateResult> {
    return this.sessionEntity.update(id, { expiredAt: new Date() });
  }
}
