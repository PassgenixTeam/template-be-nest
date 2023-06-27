import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Session,
  SessionSchema,
} from 'src/modules/session/schema/session.schema';
import { SessionRepository } from 'src/modules/session/session.repository';
import { SessionService } from 'src/modules/session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [],
  providers: [SessionRepository, SessionService],
  exports: [SessionRepository, SessionService],
})
export class SessionModule {}
