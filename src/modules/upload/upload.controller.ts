import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { Auth, AuthUser } from '../../../libs/core/src';
import { multerMemoryOption } from '../../../libs/common/src';
import { FilterFileDto } from './dto/requests/filter-file.dto';
import { FileResponseDto } from 'src/modules/upload/dto/responses/files.response.dto';

@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Get a upload all' })
  @Get('')
  @ApiOkResponse({
    description: 'The record has been successfully get all.',
    type: FileResponseDto,
  })
  async getAll(@Query() filter: FilterFileDto) {
    return this.uploadService.getAll(filter);
  }

  @ApiOperation({ summary: 'Upload files' })
  @Auth()
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Post()
  upload(
    @UploadedFiles() files: Express.Multer.File[],
    @AuthUser('id') userId: string,
  ) {
    return this.uploadService.create(files);
  }

  @ApiOperation({ summary: 'Delete all upload' })
  @Delete()
  async removeAll() {
    return this.uploadService.removeAll();
  }
}
