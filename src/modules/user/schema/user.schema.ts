import { SessionEntity } from '../../session/entities/session.entity';
import { Expose } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity, ROLE } from '@app/common';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User extends BaseEntity {
  @Expose()
  @Prop({ type: String })
  password: string;

  @Prop({ type: String, unique: true })
  @Expose()
  email: string;

  @Prop({ type: String })
  @Expose()
  firstName: string;

  @Prop({ type: String })
  @Expose()
  lastName: string;

  @Prop({
    type: String,
    default:
      // eslint-disable-next-line max-len
      'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=',
  })
  @Expose()
  avatarUrl: string;

  @Prop({ type: Boolean, default: false })
  @Expose()
  isActive: boolean;

  @Prop({ type: String, enum: ROLE, default: ROLE.FREELANCE })
  @Expose()
  role: ROLE;

  @Expose()
  loginSession: SessionEntity;

  @Expose()
  cacheId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
