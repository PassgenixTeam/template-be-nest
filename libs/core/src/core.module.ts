import { LoggerMiddleware } from '@app/common';
import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { appConfig } from './config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { RolesGuard } from './guards/roles/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionEntity } from '../../../src/modules/session/entities/session.entity';
import { SessionService } from '../../../src/modules/session/session.service';
import { CacheModule } from './cache/cache.module';
import { JwtAuthGuard } from '@app/core/guards';
import { WsJwtAuthGuard } from '@app/core/guards/jwt-auth/ws-jwt-auth.guard';
import { BackupDbModule } from './modules/backup-db/backup-db.module';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'public').replace('/dist', ''),
    }),
    TypeOrmModule.forFeature([SessionEntity]),
    //
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    //
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig.jwt.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: appConfig.jwt.JWT_EXPIRES_IN,
        },
      }),
    }),
    CacheModule.register(),
    BackupDbModule.start({ isStart: false }),
  ],
  controllers: [],
  providers: [
    JwtAuthGuard,
    WsJwtAuthGuard,
    RolesGuard,
    JwtService,
    JwtStrategy,
    SessionService,
  ],
  exports: [
    CacheModule,
    PassportModule,
    JwtModule,
    JwtAuthGuard,
    WsJwtAuthGuard,
    RolesGuard,
    JwtStrategy,
    SessionService,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
