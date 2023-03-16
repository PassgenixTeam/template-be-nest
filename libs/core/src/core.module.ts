import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoggerMiddleware } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { appConfig } from './config';

@Global()
@Module({
  imports: [
    //
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    //
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig.jwt.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: appConfig.jwt.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard, RolesGuard, JwtStrategy, JwtService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
