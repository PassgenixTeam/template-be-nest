import { Injectable } from '@nestjs/common';
import { S3UploadService } from '../../../libs/upload/src';
import { UploadEntity } from './entities/upload.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterFileDto } from './dto/requests/filter-file.dto';
import { FilesDto } from 'src/modules/upload/dto/responses/files.response.dto';
import { ResponseTransform, deleteFiles } from '@app/common';
import { FILE_STATUS } from 'src/shared/business/upload';
import { appConfig } from '@app/core';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadEntity: Repository<UploadEntity>,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @ResponseTransform<FilesDto>(FilesDto)
  async getAll(filter: FilterFileDto) {
    const { status } = filter;
    const query = this.uploadEntity.createQueryBuilder('upload');

    if (status) {
      query.andWhere('upload.status = :status', { status });
    }

    return query.getMany();
  }

  async createFileLocal(files: Express.Multer.File[]) {
    const newFiles = files.map((file, i) => {
      return {
        url: `${appConfig.server.URL}/file/${file.filename}`,
        key: files[i].path,
        status: FILE_STATUS.PENDING,
        size: files[i].size,
        type: files[i].mimetype,
      };
    });

    return this.uploadEntity.save(plainToInstance(UploadEntity, newFiles));
  }

  async create(files: Express.Multer.File[]) {
    const s3Files = await this.s3UploadService.s3UploadMultiple(files);
    const newUploads = s3Files.map(async (file, i) => {
      const upload = this.uploadEntity.create({
        url: file.Location,
        key: file.Key,
        status: FILE_STATUS.PENDING,
        size: files[i].size,
        type: files[i].mimetype,
      });

      return this.uploadEntity.save(upload);
    });

    return Promise.all(newUploads);
  }

  async removeAll() {
    const files = await this.uploadEntity.find({
      where: [{ status: FILE_STATUS.PENDING }, { status: FILE_STATUS.DELETED }],
    });

    await this.s3UploadService.deleteFiles(
      files.map((file) => ({ Key: file.key })),
    );

    return this.uploadEntity.delete(files.map((file) => file.id));
  }

  async removeAllLocal() {
    const files = await this.uploadEntity.find({
      where: [{ status: FILE_STATUS.PENDING }, { status: FILE_STATUS.DELETED }],
    });

    await deleteFiles(files.map((file) => file.key));

    return this.uploadEntity.delete(files.map((file) => file.id));
  }
}
