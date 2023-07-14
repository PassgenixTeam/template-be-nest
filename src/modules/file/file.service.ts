import { Injectable } from '@nestjs/common';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  readFile(filename: string): ReadStream {
    const file = createReadStream(
      join(process.cwd(), 'public/uploads', filename),
    );

    return file;
  }
}
