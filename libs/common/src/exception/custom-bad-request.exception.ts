import { BadRequestException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends BadRequestException {
  constructor(message: string | number) {
    super({
      message: message.toString(),
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
