import { Injectable } from '@nestjs/common';
import { S3UploadService } from '../../../libs/upload/src';
import { FilterFileDto } from './dto/requests/filter-file.dto';
import { FilesDto } from 'src/modules/upload/dto/responses/files.response.dto';
import { ResponseTransform } from '@app/common';
import { UploadRepository } from 'src/modules/upload/upload.repository';
import { FilterQuery } from 'mongoose';
import { Upload } from 'src/modules/upload/schema/upload.schema';
import { FILE_STATUS } from 'src/shared/business/upload';

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @ResponseTransform<FilesDto>(FilesDto)
  async getAll(filter: FilterFileDto) {
    const { status } = filter;
    const query: FilterQuery<Upload> = {};

    if (status) {
      query.status = status;
    }

    return this.uploadRepository.findAll(query);
  }

  async create(files: Express.Multer.File[]) {
    const s3Files = await this.s3UploadService.s3UploadMultiple(files);
    const newUploads = s3Files.map(async (file, i) => {
      return this.uploadRepository.create({
        url: file.Location,
        key: file.Key,
        status: FILE_STATUS.PENDING,
        size: files[i].size,
        type: files[i].mimetype,
      });
    });

    return Promise.all(newUploads);
  }

  async removeAll() {
    const files = await this.uploadRepository.findAll({
      $or: [{ status: FILE_STATUS.PENDING }, { status: FILE_STATUS.DELETED }],
    });

    await this.s3UploadService.deleteFiles(
      files.map((file) => ({ Key: file.key })),
    );

    return this.uploadRepository.removeMany(
      files.map((file) => ({ _id: file._id })),
    );
  }
}
