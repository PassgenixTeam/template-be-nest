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
import { join } from 'path';
import { appConfig } from './config';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'src/modules/session/session.module';
import { CacheModule } from './cache/cache.module';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'public').replace('/dist', ''),
    }),
    //
    MongooseModule.forRoot(appConfig.database.MONGO_DB.DB_URI),
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
    SessionModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard, RolesGuard, JwtService, JwtStrategy],

  exports: [
    CacheModule,
    PassportModule,
    JwtModule,
    JwtAuthGuard,
    RolesGuard,
    JwtStrategy,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
