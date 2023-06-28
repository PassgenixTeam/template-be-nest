import { BaseEntity } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FILE_STATUS, IUpload } from 'src/shared/business/upload';

export type UploadDocument = HydratedDocument<Upload>;

@Schema({ timestamps: true, versionKey: false })
export class Upload extends BaseEntity implements IUpload {
  @Prop({ type: String })
  type!: string;

  @Prop({ type: Number })
  size!: number;

  @Prop({ type: String })
  url!: string;

  @Prop({ type: String })
  key!: string;

  @Prop({ type: String, enum: FILE_STATUS })
  status!: FILE_STATUS;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
