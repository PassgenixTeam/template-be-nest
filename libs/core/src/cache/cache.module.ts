import { DynamicModule, Module, Provider } from '@nestjs/common';
import { appConfig } from '../config';
import { RedisService } from './redis.service';

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
