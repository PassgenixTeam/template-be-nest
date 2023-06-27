import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionService } from '../session/session.service';
import { User, UserSchema } from 'src/modules/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Session,
  SessionSchema,
} from 'src/modules/session/schema/session.schema';
import { UserRepository } from 'src/modules/user/user.repository';
import { SessionRepository } from 'src/modules/session/session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    SessionService,
    UserRepository,
    SessionRepository,
  ],
})
export class AuthModule {}
