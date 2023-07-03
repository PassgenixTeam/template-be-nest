import { PartialType } from '@nestjs/mapped-types';
import { CreateTestSocketDto } from './create-test-socket.dto';

export class UpdateTestSocketDto extends PartialType(CreateTestSocketDto) {
  id!: number;
}
