import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  findOne(@Param('filename') filename: string, @Res() res: Response) {
    const file = this.fileService.readFile(filename);

    return file.pipe(res);
  }
}
