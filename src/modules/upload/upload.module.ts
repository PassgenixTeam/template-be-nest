import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { S3UploadService } from '../../../libs/upload/src';
import { Upload, UploadSchema } from './schema/upload.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadRepository } from 'src/modules/upload/upload.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService, S3UploadService, UploadRepository],
})
export class UploadModule {}
