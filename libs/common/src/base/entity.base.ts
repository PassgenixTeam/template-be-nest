import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { IBase } from 'src/shared/business/base';
import { USER_COLLECTION } from 'src/shared/business/user';

export type BaseDocument = HydratedDocument<BaseEntity>;

@Schema({ timestamps: true, versionKey: false })
export class BaseEntity implements IBase {
  @Expose()
  _id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  @Expose()
  createdBy?: string | Record<string, any>;

  @Prop({ type: Date, default: Date.now() })
  @Expose()
  updatedBy?: string;

  @Prop({ type: Date, default: null })
  @Expose()
  deletedAt?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_COLLECTION })
  @Expose()
  deletedBy?: string;
}

export const BaseSchema = SchemaFactory.createForClass(BaseEntity);
