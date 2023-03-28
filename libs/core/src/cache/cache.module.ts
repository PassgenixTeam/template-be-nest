import { Module, DynamicModule, Provider, OnModuleInit } from '@nestjs/common';
import { REDIS_PROVIDER } from './redis.constant';
import { RedisService } from './redis.service';
import { appConfig } from '../config';

@Module({})
export class CacheModule {
  static register(): DynamicModule {
    const providers: Provider<any>[] = [
      {
        provide: RedisService,
        useFactory: () => {
          return new RedisService({
            host: appConfig.redis.REDIS_HOST,
            port: +appConfig.redis.REDIS_PORT,
            password: appConfig.redis.REDIS_PASSWORD,
          });
        },
      },
    ];

    return {
      module: CacheModule,
      providers: providers,
      exports: providers,
    };
  }
}
