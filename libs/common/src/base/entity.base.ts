import { Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

export class BaseEntity {
  @Expose()
  id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Expose()
  createdBy: string | Record<string, any>;

  @Prop({ type: Date, default: Date.now() })
  @Expose()
  updatedBy: string;

  @Prop({ type: Date })
  @Expose()
  deletedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Expose()
  deletedBy: string;
}
