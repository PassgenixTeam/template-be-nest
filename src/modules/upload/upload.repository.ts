import { BaseRepository } from '@app/common/base/repository.base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Upload,
  UploadDocument,
} from 'src/modules/upload/schema/upload.schema';

@Injectable()
export class UploadRepository extends BaseRepository<Upload> {
  constructor(@InjectModel(Upload.name) uploadModel: Model<UploadDocument>) {
    super(uploadModel as any as Model<Upload>);
  }
}
