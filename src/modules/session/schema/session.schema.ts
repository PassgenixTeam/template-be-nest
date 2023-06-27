import { BaseEntity } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';
import { ISession } from 'src/shared/bussiness/session';
import { USER_COLLECTION } from 'src/shared/bussiness/user';

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
})
export class Session extends BaseEntity implements ISession {
  @Prop({ type: String })
  @Expose()
  accessToken: string;

  @Prop({ type: String })
  @Expose()
  refreshToken: string;

  @Prop({ type: Date })
  @Expose()
  expiredAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Expose()
  idUser: string;

  @Expose()
  user?: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.virtual('user', {
  ref: User.name,
  localField: 'idUser',
  foreignField: '_id',
  justOne: true,
});
