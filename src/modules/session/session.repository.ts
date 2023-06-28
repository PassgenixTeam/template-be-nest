import { BaseRepository } from '@app/common/base/repository.base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Session,
  SessionDocument,
} from 'src/modules/session/schema/session.schema';

@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(
    @InjectModel(Session.name)
    sessionModel: Model<SessionDocument>,
  ) {
    super(sessionModel as any as Model<Session>);
  }
}
